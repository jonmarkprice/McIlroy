const { User } = require('./schema');

function deleteProgram(user, name) {
  return User
    .where({name: "test"})
    .update({"$pull": {"programs": {"name": name}}})
    .exec() // returns a promise
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log("An error occured in deleteProgram.");
      console.error(err);
    });
}

module.exports = deleteProgram;
