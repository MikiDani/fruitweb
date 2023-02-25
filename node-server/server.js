const cors = require('cors');
const express = require('express');
const bodyPharser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    // True a szigorú séma betartást jelenti. A false esetén azokat a kapott adatokat is menti amik nincsenek meghatározva a sémában.
    mongoose.set('strictQuery', true);

    await mongoose.connect('mongodb://127.0.0.1:27017/fruitweb');
    console.log('Mongo db connected.');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const usersSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', usersSchema);

const server = express();

server.use(express.json());
server.use(cors());
server.use(bodyPharser.json());

const port = 8080;

// CRUD

server.get('/list', async(req, res) => {

    const doc = await User.find({ username: /Dani/, password: /12345/ });
    res.send(doc);
});

server.post('/login', async(req, res) => {

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    const doc = await user.save();

    console.log(doc);
    res.json(doc);
});

server.post('/add', async(req, res) => {
    console.log('ADD');

    console.log(req.body);

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    const doc = await user.save();

    res.json(doc);
});

server.post('/remove', async(req, res) => {
    console.log('REMOVE');

    console.log(req.body);
    
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    const doc = await user.remove({_id: '63f3beb22a872802e1392506'});
    res.json(doc);
    
});

// LISTENER
server.listen(port, () => {
    console.log('Server started : ' + port + ' port.');
});