const dbg = require('debug')('save-program');
const db = require('./db');

function saveProgram(user, program) {
  return db.connection.User
    .findOne({name: user}).exec() // return a promise
    .then(data => {
      if (data !== null) {
        data.programs.push(program);
        return data.save();
      } else {
        return Promise.reject('User not found');
      }
    })
    .then(data => {
      dbg('Saved program. Response after save(): %O', data);
    })
}

module.exports = saveProgram;
