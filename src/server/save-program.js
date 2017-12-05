const { User } = require('./schema');

function saveProgram(user, program) {
  return User
    .findOne({name: user}).exec() // return a promise
    .then(data => {
      if (data !== null) {
        // console.log("TODO: add a user");
        data.programs.push(program); 
        return data.save() // doesn't need exec(?)
      } else {
        return Promise.reject('User not found');
      }
    })
    .then(x => {
      console.log('Saved program');
      // process.exit(0); 
    })
    .catch(err => {
      console.log("An error occured!");
      console.error(err);
    });
}

module.exports = saveProgram;
