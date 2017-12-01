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

const me = new User({name: 'test', programs: []});

// does it matter if I use arrow fns here?
me.save(function (err) {
  if (err) return console.log(`Oh no! ${err}`);
  else {
    console.log('User saved.');
    process.exit(0);
  }
});


//const connection = mongoose.createConnection('mongodb://localhost:27017/test');
// const result = User.find({name: 'test'}).exec(x => console.log(x));

