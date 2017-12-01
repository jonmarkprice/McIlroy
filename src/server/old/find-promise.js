const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = Promise;
/*
const app = experess();

// TODO: create model users

// app.use...

//...
app.get('/users', (req, res) => {
  mongoose.model('users').find((err, users) => {
    res.send(users);
  })
});
*/

////// Schema
//mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

// TODO import this
const userSchema = new Schema({
  name: String,
  programs: [{
    name: String,
    expansion: [{
      token: String,
      value: Schema.Types.Mixed
    }]
  }]
});

const User = mongoose.model('User', userSchema);

/*
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
    process.exit(0);
  })
  .catch(console.error)
*/

User.count({name: 'test'})
.count((err, count) => new Promise((resolve, reject) => {
  if (err) {
    reject(err);
  } else {
    resolve(count);
  }
}));
.then(x => {
  if (x === 0) {
    // console.log("TODO: add a user");
    const me = new User({
      name: 'test',
      programs: [
        {name: 'inc', [1, '+', ':']},
        {name: 'product', ['*', 1, 'reduce', ':']}  
      ]
    });
    return me.save((err, data) => new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        // console.log(`Got ${data}.`);
        resolve(data);
      }
    }));
  } else {
    console.log("Test user already exists.");
    process.exit();
  }
})
.then(x => {
  console.log('Saved new user.');
  process.exit(0); 
})
.catch(x => {
  console.log("An error occured!")
  console.error(x)
});



