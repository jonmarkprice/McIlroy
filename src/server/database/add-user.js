const AWS = require("../../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

const { equals } = require('ramda');
const bcrypt = require('bcryptjs');
const dbg = require('debug')('add-user');

function addUser(username, password) {
  dbg("Searching for user");
  return ddb.get({
    TableName: process.env.USERS_TABLE,
    Key: {"UserId": username}
  })
  .promise()
  .then(function hashPassword(result) {
    dbg("User lookup result: %O", result);
//    if (result === null) { // Best way? // or result.Item?
      // continue
    if (equals({}, result)) {
      const saltRounds = 7;
      return bcrypt.hash(password, saltRounds); // promise?
    } else {
      dbg("User already exists!");
      return Promise.reject('USERNAME EXISTS');
    }
  })
  .then(function saveUser(hash) {
    dbg("Saving new user: '%s'...", username);
    return new Promise(function (resolve, reject) {
      ddb.put({
        TableName: process.env.USERS_TABLE,
        Item: {
          "UserId": username,
          "PasswordHash": hash
        }
      }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          // Return an object that is serializable by Passport.
          // Need to include password hash?
          resolve({username});
        }
      });
    });
  })
}

module.exports = addUser;
