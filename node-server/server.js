const log = console.log;
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

    log('page: ' + page);

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

    log('page: ' + page);

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
server.post('/login', (req, res) => {
    const userDatas = req.body;

    res.status(200).json({ msg: 'Itt lesz a bejelentkezés...' })

})

// INSERT USER
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
                    res.status(201).json(result)
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