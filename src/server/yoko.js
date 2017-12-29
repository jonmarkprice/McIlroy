const db = require('./db');
const addUser = require('./add-user');

db.connect();
console.log('Connecting... status: %s', db.isConnected);
addUser('yoko', 'secret');

/* To see new user
$ mongo
> use local
> db.User.find()
*/ 

