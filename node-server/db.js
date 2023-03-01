const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/fruitweb')
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection,
    danika: (a, b) => {
        let c = a + b;
        console.log('a: ' + a);
        console.log('b: ' + b);
        console.log('a+b = c: ' + c);

        return c;
    }
}