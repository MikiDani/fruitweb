const cors = require('cors');
const express = require('express');
const server = express();
server.use(express.json());
server.use(cors());

const port = 8080;

server.get('/demo', (req, res) => {
    res.send('Hello 2!');
});

server.listen(port, () => {
    console.log('Server started : ' + port + ' port.');
});