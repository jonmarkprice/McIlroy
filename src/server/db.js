// GOAL: export a variable 'connection' that holds the mongo db connection
// export a variable isConnected (true/false)
// export a function connect()
// Usage:
//  Once
//  db.connect()
// 
//  Elsewhere
//  db.connection.User = ...

const dbg = require('debug')('db');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose.Promise = Promise;

class Database {
  constructor() {
    this.isConnected = true;
    this.connection  = null;
  }

  connect() {
    const userSchema = new Schema({
      username: String,
      programs: [{
        name: String,
        expansion: [Schema.Types.Mixed]
      }],
      password: String  
    });
    // TODO: later use password hash

    mongoose.connect('mongodb://jon:pw@ds249415.mlab.com:49415/mcilroy')
    .catch(err => {
      dbg('Caught db error');
      this.isConnected = false;

      // catch and re-throw
      throw(err);
    });
    this.isConnected = true;
    this.connection = {};

    // Add user schema to connection
    if (mongoose.models.User) {
      this.connection.User = mongoose.model('User');
    } else {
      this.connection.User = mongoose.model('User', userSchema);
    }
  }
}

let db = new Database();
module.exports = db;
