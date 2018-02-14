const AWS = require("../aws_conf");
const ddb = new AWS.DynamoDB.DocumentClient();

const passport  = require('passport');
const Strategy  = require('passport-local').Strategy;
const bcrypt    = require('bcrypt');
const dbg       = require('debug')('passport-config');
const { equals } = require("ramda");

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, done) {
    dbg("authenticating...");
    ddb.get({
      TableName: "EBUsers",
      Key: {"UserId": username},
      ProjectionExpression: "PasswordHash"
    })
    .promise()
    .then(function (result) {
      if (equals({}, result)) {
        done(null, false);
      } else {
        return result;
      }
    })
    .then(function (result) {
      dbg("Got password: ", result);
      const hash = result.Item.PasswordHash;
      bcrypt.compare(password, hash, function(err, res) {
        dbg("----- CHECKING MATCH (bcrypt) ----");
        if (res) {
          const user = {username};
          dbg('Authenticated');
          return done(null, user);
        } else {
          dbg('Authentication failed');
          return done(null, false);
        }
      });
    })
    .catch(done);
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, done) {
  dbg("serializing ...");
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  dbg("deserializing...");
  ddb.get({
    TableName: "EBUsers",
    Key: {"UserId": id},
    // ProjectionExpression: "UserId" //want?
  })
  .promise()
  .then(result => {
    dbg(result);
    done(null, {username: result.Item.UserId})
  })
  .catch(done);
});

module.exports = passport;
