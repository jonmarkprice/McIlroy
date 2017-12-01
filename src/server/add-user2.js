// const express = require('express');
// const mongoose = require('mongoose');
//const { Schema } = mongoose;
const { User } = require('./schema');

// mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

User.count({name: 'test'})
.count((err, count) => new Promise((resolve, reject) => {
  if (err) {
    reject(err);
  } else {
    resolve(count);
  }
}))
.then(x => {
  if (x === 0) {
    // console.log("TODO: add a user");
    const me = new User({
      name: 'test',
      programs: [
        {name: 'inc',     expansion: [1, '+', ':']},
        {name: 'product', expansion: ['*', 1, 'reduce', ':']}  
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

