const bcrypt = require('bcrypt');
const db = require('./db');
// const dbg = require('debug')('add-user');

function addUser(username, password) {
  console.log("Searching for user");
  return db.connection.User
  .findOne({username}).exec()
  .then(user => {
    if (user === null) {
      const saltRounds = 7;
      return bcrypt.hash(password, saltRounds)
    } else {
      return Promise.reject("Test user already exists.");
    }
  })
  .then(function(hash) {
    console.log("Saving new user: %s...", username);
    return new db.connection.User({
      username,
      password: hash,
      programs: [],
    })
    .save(); // Also returns a promise
  });
}

module.exports = addUser;
