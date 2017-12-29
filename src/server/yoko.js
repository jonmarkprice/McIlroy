const db = require('./db');
const addUser = require('./add-user');

db.connect();
console.log('Connecting... status: %s', db.isConnected);
addUser('yoko', 'secret')
.then(stat => { console.log("Saved. Status: %s", stat); })
.catch(err => { throw new Error(err) });
/* To see new user
$ mongo
> use local
> db.User.find()
*/ 

