const log = console.log;
const crypto = require('crypto'); // hash
const cors = require('cors');
const express = require('express');
const bodyPharser = require('body-parser');
const { connectToDb, getDb, danika } = require('./db');
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

// routes

// ALL USERS LIST
server.get('/allusers', (req, res) => {
    // current page
    const page = req.query.p || 0
    const userPerPage = 2

    //log('page: ' + page);

    let users = [];

    db.collection('users')
        .find()
        .sort({ username: 1 })
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document.' })
        })
})

// USERS / PAGES
server.get('/pageusers', (req, res) => {
    const page = req.query.p || 0
    const userPerPage = 2

    //log('page: ' + page);

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

// ONE USER DATAS
server.get('/users/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        const objectId = new ObjectId(req.params.id);

        db.collection('users')
            .findOne({ _id: objectId })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid id.' })
    }
})

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

            const epochStart = Date.now()
            const epochEnd = Date.now() + 3600
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
    const mandatory = ['username', 'email', 'password'];

    let input = functions.checkInputs(req.body, mandatory);
    console.log(input);

    if (input) {
        // check username and email in database

        let issetUsername = await checkValue(db, 'users', 'username', input.username);
        let issetEmail = await checkValue(db, 'users', 'email', input.email);

        if (!issetUsername && !issetEmail) {
            // insert user in database
            db.collection('users')
                .insertOne(input)
                .then(result => {
                    // result visszak??ld?
                    res.status(201).json({ success: 'Successful registration!' })
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

////////////////////////////
// Database use Functions //
////////////////////////////

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