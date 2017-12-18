const dbg = require('debug')('edit-program');
const db = require('./db');

function editProgram(user, oldName, newName, newProgram) {
  return db.connection.User
    .findOne({name: user}).exec() // return a promise
    .then(data => {
      if (data !== null) {
        found = false;
        for (p of data.programs) {
          if (p.name === oldName) {
            p.name      = newName;
            p.expansion = newProgram;
            found     = true;
            break;
          }
        }
        if (found) {
          return data.save();
        } else {
          return Promise.reject('Program not found');
        }
      } else {
        return Promise.reject('User not found');
      }
    })
    .then(data => {
      dbg('Saved program. Response after save(): %j', data);
    })
}

module.exports = editProgram
