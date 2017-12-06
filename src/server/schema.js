const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/test', {useMongoClient: true});
mongoose.connect(
  'mongodb://jon:pw@ds249415.mlab.com:49415/mcilroy',
  {useMongoClient: true}
).catch(err => console.err(err));

const userSchema = new Schema({
  name: String,
  programs: [{
    name: String,
    expansion: [Schema.Types.Mixed]
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
