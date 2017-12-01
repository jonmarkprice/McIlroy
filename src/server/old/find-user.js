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

User.find({name: 'test'}, (err, docs) => {
  if (err) return console.error(err);
  else {
    console.log(JSON.stringify(docs, null, 3));
    
    process.exit(0);
  }
});

// TODO: do this with promises

