// The goal of this script is to get the programs of a user from the database.
// These can then be 
// 1. Displayed on a page
// 2. Loaded into the program-builder
const { User } = require('./schema');

const query = User.find({name: 'test'}, (err, docs) => 
  new Promise((resolve, reject) => {
    if (err) {
      reject(err);
    } else {
      resolve(docs);
    }
  }));

query
.then(docs => {
  console.log(JSON.stringify(docs, null, 3));
  //console.table(docs);  

  process.exit(0);
})
.catch(console.error)

