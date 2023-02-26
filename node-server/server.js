const cors = require('cors');
const express = require('express');
const bodyPharser = require('body-parser');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const port = 8080;

const server = express();

server.use(express.json());
server.use(cors());
server.use(bodyPharser.json());

// db connection
let db

connectToDb((err) => {
    if (!err) {
        server.listen(port, () => {
            console.log('Mongo Db connected.');
            console.log('server listening on port ' + port);
        })
        db = getDb()
    }
})

// routes
server.get('/list', (req, res) => {

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

server.get('/user/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        var objectId = new ObjectId(req.params.id);

        db.collection('users')
            .findOne({ _id: objectId })
            .then((data) => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the document.' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid id.' })
    }
})