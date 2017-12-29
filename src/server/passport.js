const passport  = require('passport');
const Strategy  = require('passport-local').Strategy;
const bcrypt    = require('bcrypt');
const dbg       = require('debug')('passport-config');
const db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, done) {
    db.connection.User
    .findOne({username}, function(err, user) {
      dbg("----- QUERYING DATABASE ----");
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      //             plain     hash
      bcrypt.compare(password, user.password, function(err, res) {
        dbg("----- CHECKING MATCH (bcrypt) ----");
        if (res) {
          dbg('Authenticated');
          return done(null, user);
        } else {
          dbg('Authentication failed');
          return done(null, false);
        }
      });
    })
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.connection.User
  .findOne({_id: id}, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

module.exports = passport;
