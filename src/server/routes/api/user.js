const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
// Try using the "real" passport, following:
// http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.WkL9p0tMGSM
const passport    = require('passport');

////////////////////////////////////////////////////////////////////////////////////////
const loginDbg  = require('debug')('user-api:login');
// const logoutDbg = require('debug')('user-api:logout');
const regDbg      = require('debug')('user-api:register');

const { empty }   = require('../helpers');
const addUser     = require('../../add-user');
const userExists  = require('../../user-exists');

const parser = bodyParser.urlencoded({extended: true});

// Define routes. 
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    loginDbg(req.user);
    res.redirect('/');
  });
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.post('/register', parser, (req, res, next) => {
  // Cannot destructure of undef or null.
  // is req.body right?

  // TODO I should scan username for legality (injection!) before scanning
  const {pw, pwConfirm, username} = req.body;
  userExists(username)
  .then(exists => {
    if (exists) {
      // TODO: send real error msg.
      regDbg('Username %s, is taken.', username);
      res.sendStatus(401);
    } else {
      if (pw !== pwConfirm) {
        // Also async...
        // return saveUser(username, pw);
        regDbg('Passwords do not match');
      } else {
        return Promise.resolve(true);
      }
    }
  }).then(data => {
    if (data === true) {
      // Log in user via cookie
      regDbg('Creating new user, %s...', username);

      // Maybe this should return the full user, incl. id
      addUser(username, pw)
      .then(user => {
        regDbg("Addiing user...");
        if (user !== undefined) {
          regDbg('User created, redirecting.');

          // Log new user in
          req.login(user, function(err) {
            if (err) return next(err);
            res.redirect('/');
          });
        } else {
          regDbg('Username already exists!');
          res.redirect('/register');
        }
      })
      .catch(err => {
        throw new Error(err);
      });
    } else {
      // TODO real msg
      regDbg('data (%o, from username avail.) != true', data);
      res.sendStatus(401);
    }
  }).catch(err => {
    // TODO: send real error msg.
    res.sendStatus(400);
    throw err;
  });
});

module.exports = router;
