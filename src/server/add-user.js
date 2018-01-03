const bcrypt = require('bcrypt');
const db = require('./db');
const dbg = require('debug')('add-user');

function addUser(username, password) {
  dbg("Searching for user");
  return db.connection.User
  .findOne({username}).exec()
  .then(user => {
    if (user === null) {
      const saltRounds = 7;
      return bcrypt.hash(password, saltRounds)
    } else {
      return Promise.reject('USERNAME EXISTS');
    }
  })
  .then(function(hash) {
    dbg("Saving new user: %s...", username);
    return new db.connection.User({
      username,
      password: hash,
      programs: [],
    })
    .save(); // Also returns a promise
  })
  .catch(err => {
    dbg("Re-return rejection");
    return Promise.reject(err);
  }); // Do we want to catch here, or later?
}

module.exports = addUser;
