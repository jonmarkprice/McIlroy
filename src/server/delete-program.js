const { User } = require('./schema');

function deleteProgram(user, name) {
  return User
    .where({name: "test"})
    .update({"$pull": {"programs": {"name": name}}})
    .exec() // returns a promise
    // .find({name: user}).exec() // return a promise
    /*
    .then(data => {
      if (data !== null) {
        data.programs.push(program);
        return data.save();
      } else {
        return Promise.reject('User not found');
      }
    }) */
    .then(data => {
      console.log(data)
      // console.log('Saved program');
      // process.exit(0); 
    })
    .catch(err => {
      console.log("An error occured!");
      console.error(err);
    });
}

module.exports = deleteProgram;
