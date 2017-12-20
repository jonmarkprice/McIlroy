const db = require('./db');

function userExists(username) {
  return db.connection.User
    .findOne({name: username})
    .exec()
    .then(data => (data !== null));
}

module.exports = userExists;
