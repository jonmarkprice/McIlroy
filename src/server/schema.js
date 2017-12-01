const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

const userSchema = new Schema({
  name: String,
  programs: [{
    name: String,
    expansion: [Schema.Types.Mixed]
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
