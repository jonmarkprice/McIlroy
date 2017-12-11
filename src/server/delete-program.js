const dbg = require('debug')('delete-user');
const db = require('./db');

function deleteProgram(user, name) {
  return db.connection.User
  .where({name: "test"})
  .update({"$pull": {"programs": {"name": name}}})
  .exec() // returns a promise
  .then(data => {
    dbg("response from mongo: %O", data);
  });
}

module.exports = deleteProgram;
