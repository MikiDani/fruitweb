const log = console.log;
const crypto = require('crypto'); // hash
const cors = require('cors');
const express = require('express');
const bodyPharser = require('body-parser');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
const functions = require('./functions');

const port = 8080;

const server = express();
server.use(express.json());

server.use(express.json());
server.use(cors());
server.use(bodyPharser.json());

// db connection
let db;

connectToDb((error) => {
    if (!error) {
        server.listen(port, () => {
            log('Mongo Db connected.');
            log('server listening on port ' + port);
        })
        db = getDb()
    }
})

//----------------
// no autentication : LOGIN and REGISTRATION

// LOGIN
server.post('/login', async(req, res) => {

    const usernameOrEmail = req.body.usernameoremail;
    const password = req.body.password;

    if (usernameOrEmail !== undefined && password !== undefined) {
        // SEARCH USER IN DATABASE
        let resData = {}
        const haveUser = await db.collection('users')
            .find({
                $and: [
                    { password: password },
                    { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
                ]
            })
            .forEach(data => resData = data)
            .then(() => {
                const result = (Object.values(resData).length) ? resData : false;
                return result
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })

        if (haveUser) {
            // SEARCH TOKEN IN DATABESE
            const objectId = new ObjectId(haveUser._id).valueOf()
            let resData = {}
            const haveToken = await db.collection('tokens')
                .find({ userid: objectId })
                .forEach(data => resData = data)
                .then(() => {
                    const result = (Object.values(resData).length) ? resData : false;
                    return result
                })
                .catch(() => {
                    res.status(500).json({ error: 'Could not fetch the document.' })
                })

            const epochStart = parseInt(Date.now())
            const epochEnd = parseInt(epochStart + 5760000)
            const random = (Math.floor(Math.random() * 10) + 1).toString()
            const token = crypto.createHash('sha1').update(random).digest('hex')
            const userId = new ObjectId(haveUser._id)

            if (haveToken) {
                // REFRESH TOKEN IN DATABASE
                const tokenId = new ObjectId(haveToken._id)
                db.collection('tokens')
                    .updateOne({ _id: tokenId }, { $set: { token: token, epochstart: epochStart, epochend: epochEnd } })
                    .then(result => {
                        log('update token: ' + token)
                        res.status(201).json({ success: token, result: result })
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Could not refresh the user token.', err: err })
                    })
            } else {
                // INSERT TOKEN IN DATABASE
                db.collection('tokens')
                    .insertOne({ userid: userId, token: token, epochstart: epochStart, epochend: epochEnd })
                    .then(result => {
                        log('inserted token: ' + token)
                        res.status(201).json({ success: token, result: result })
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Could not create a new document.' })
                    })
            }
        } else {
            res.status(400).json({ error: 'Identification error.' })
        }
    } else {
        res.status(400).json({ error: 'Missing inputs.' })
    }

})

// REGISTRATION
server.post('/users/add', async(req, res) => {
    const mandatory = ['username', 'email', 'password', 'rank'];

    let input = functions.checkInputs(req.body, mandatory);

    if (input) {
        // check username and email in database

        let issetUsername = await checkValue(db, 'users', 'username', input.username);
        let issetEmail = await checkValue(db, 'users', 'email', input.email);

        if (!issetUsername && !issetEmail) {
            // insert user in database
            db.collection('users')
                .insertOne(input)
                .then(result => {
                    res.status(201).json({ success: 'Successful registration!', result: result })
                })
                .catch(err => {
                    res.status(500).json({ error: 'Could not create a new document.' })
                })
        } else {
            let errorMsg = '';
            if (issetUsername) { errorMsg += 'The username is already in use! '; }
            if (issetEmail) { errorMsg += 'The email is already in use!'; }
            res.status(400).json({ error: errorMsg })
        }
    } else {
        res.status(400).json({ error: 'Missing inputs.' })
    }
})

//---------------------
// HAVE autentication :
//---------------------

// ALL USERS LIST
server.get('/allusers', async(req, res) => {
    // current page

    if (req.headers.token && await authorize(req.headers.token)) {

        //console.log(req.headers.token)

        let users = [];

        db.collection('users')
            .find()
            .sort({ username: 1 })
            .forEach(user => users.push({
                _id: user._id,
                username: user.username,
                email: user.email,
                rank: user.rank
            }))
            .then(() => {
                res.status(200).json(users)
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })

    } else {
        res.status(400).json({ error: 'You are not authorized!' })
    }

})

// USERS / PAGES
server.get('/pageusers', (req, res) => {
    const page = req.query.p || 0
    const userPerPage = 2
        // log('page: ' + page);
    let users = []

    db.collection('users')
        .find()
        .sort({ username: 1 })
        .skip(page * userPerPage)
        .limit(userPerPage)
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document.' })
        })
})

// ONE USER DATAS :ID
server.get('/users/id/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        const objectId = new ObjectId(req.params.id);

        db.collection('users')
            .findOne({ _id: objectId })
            .then((data) => {
                res.status(200).json(userDataLoad(data))
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid id.' })
    }
})

// ONE USER DATAS :TOKEN
server.get('/users/token/:token', async(req, res) => {

    //console.log(req.params.token)
    let haveTokenUserId = false

    haveTokenUserId = await db.collection('tokens')
        .findOne({ token: req.params.token })
        .then((data) => {
            if (data) {
                return data.userid;
            } else {
                return false;
            }
        })
    if (haveTokenUserId) {

        const objectId = new ObjectId(haveTokenUserId)

        let userData = await db.collection('users')
            .findOne({ _id: objectId })
            .then((data) => {
                return data
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })

        res.status(200).json(userDataLoad(userData))

    } else {
        res.status(400).json({ error: 'No have user this token.' })
    }
})

// DELETE USER
server.delete('/users/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        const objectId = new ObjectId(req.params.id);

        db.collection('users')
            .deleteOne({ _id: objectId })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not delete the user.' });
            })
    } else {
        res.status(500).json({ error: 'Not a valid id.' });
    }
})

// UPDATE USER DATA
server.patch('/users/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        const objectId = new ObjectId(req.params.id);
        const updates = req.body;

        db.collection('users')
            .updateOne({ _id: objectId }, { $set: updates })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the user datas.' });
            });

    } else {
        res.status(500).json({ error: 'Not a vaild id.' });
    }
})

// authentication
server.post('/auth/', async(req, res) => {
    if (req.headers.token && await authorize(req.headers.token)) {
        res.status(200).json({ auth: true })
    } else {
        res.status(400).json({ auth: false })
    }
})

////////////////////////////
// Database use Functions //
////////////////////////////

authorize = async(token) => {

    let returnValue = false;

    let haveToken = await db.collection('tokens')
        .findOne({ token: token })
        .then((data) => {
            if (data) { return data; } else { return false; }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document.' })
        })

    if (haveToken) {

        let nowEpoch = Date.now()

        let datenow = new Date(nowEpoch);
        let dateend = new Date(haveToken.epochend);

        if (nowEpoch < haveToken.epochend) {
            // token is correct!
            returnValue = true;
        } else {
            // token era has expired. Token deleting
            returnValue = false;
            const tokenId = new ObjectId(haveToken._id)
            db.collection('tokens')
                .deleteOne({ _id: tokenId })
                .then(result => {
                    console.log('Token deleted. result: ' + result)
                })
        }
    }

    return returnValue;
}

userDataLoad = (data) => {
    const returnUserData = {
        _id: data._id,
        username: data.username,
        email: data.email,
        rank: data.rank
    }

    return returnUserData
}

checkValue = async(db, database, rowKey, rowValue) => {

    let returnValue = false;

    let query = {};
    query[rowKey] = rowValue;

    let resDataContainer = [];

    try {
        await db.collection(database)
            .find(query)
            .forEach(data => resDataContainer.push(data))
            .then(() => {
                resDataContainer.forEach(element => {
                    if (element[rowKey] == rowValue) {
                        //log(element[rowKey]);
                        returnValue = true;
                    }
                });
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })
    } finally {
        return returnValue;
    }
}