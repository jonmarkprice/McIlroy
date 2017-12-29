const db = require('./db');
const dbg = require('debug')('add-user');

function addUser(username, password) {
  return db.connection.User
  .findOne({username}).exec()
  .then(user => {
    if (user === null) {
      new db.connection.User({
        username,
        password,
        programs: [],
      })
      .save();
      dbg("New user %s saved", username);
      return Promise.resolve(true);
    } else {
      dbg("Test user already exists.");
      return Promise.resolve(false);
    }
  });
}

module.exports = addUser;
