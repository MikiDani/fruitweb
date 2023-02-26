const log = console.log;
const cors = require('cors');
const express = require('express');
const bodyPharser = require('body-parser');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const port = 8080;

const server = express();
server.use(express.json());

server.use(express.json());
server.use(cors());
server.use(bodyPharser.json());

// db connection
let db;

connectToDb((err) => {
    if (!err) {
        server.listen(port, () => {
            log('Mongo Db connected.');
            log('server listening on port ' + port);
        })
        db = getDb()
    }
})

// routes
// users list
server.get('/users', (req, res) => {
    // current page
    const page = req.query.p || 0;
    const userPerPage = 2

    log('page: ' + page);

    let users = [];

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

// one user datas
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

// insert user
server.post('/users', (req, res) => {
    const userDatas = req.body;

    db.collection('users')
        .insertOne(userDatas)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new document.' })
        })
})

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