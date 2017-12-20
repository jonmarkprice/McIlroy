const db = require('./db');
const dbg = require('debug')('add-user');

function addUser(username) {
  db.connection.User.count({name: username})
  .count((err, count) => new Promise((resolve, reject) => {
    if (err) {
      reject(err);
    } else {
      resolve(count);
    }
  }))
  .then(count => {
    if (count === 0) {
      new db.connection.User({
        name: username,
        programs: []
      })
      .save();
    } else {
      dbg("Test user already exists.");
    }
  });
}

module.exports = addUser;
