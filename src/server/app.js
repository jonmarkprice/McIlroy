const express = require('express');
const { Schema, ...mongoose } = require('mongoose');

const app = experess();

// TODO: create model users

// app.use...

//...
app.get('/users', (req, res) => {
  mongoose.model('users').find((err, users) => {
    res.send(users);
  })
});

////// Schema
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


