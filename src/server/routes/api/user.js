const loginDbg  = require('debug')('user-api:login');
const logoutDbg = require('debug')('user-api:logout');
const regDbg    = require('debug')('user-api:register');
const express = require('express');
const bodyParser = require('body-parser');
const { empty } = require('../helpers');

const userExists = require('../../user-exists');
const addUser = require('../../add-user');

// const jsonParser = bodyParser.json();
const parser = bodyParser.urlencoded({extended: true});
const router = express.Router();

router.post('/login', parser, (req, res, next) => {
  loginDbg('Recieved login request %o.', req.body);
  loginDbg('Data %O:', req.body);

  // Mock authentication
  const user = req.body.username;
  userExists(user)
  .then(exists => {
    loginDbg(exists);
    if (exists === true) {
      req.session.user = {name: user, logged_in: true};
      res.redirect('/');
    } else {
      // Use query params?
      // res.redirect('/login?err=1'); // or use url.format
      // TODO:
      // just render a new page with error.
      // This is where a render function would make sense.
      res.send('<p>Authentication failure</p>');
    }
  })
  .catch(error => {
    throw new Error(error);
  });
  /*
  if (empty(req.body)) {
    next(new Error('No data with /api/user/login'));
  }
  else {
    const {username} = req.body; // Really we should be checking what happens
                                 // after this to ensure that no variables
                                 // remain undefined, rather than empty().
    loginDbg("Logging in user: '%s'", username);
    res.redirect('/');
  }*/
});

// just get from link
router.get('/logout', (req, res, next) => {
  logoutDbg('logout requested.');
  req.session.user = {name: null, logged_in: false};
  res.redirect('/login');
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
      req.session.user = {name: username, logged_in: true};
      regDbg('Creating new user, %s...', username);
      addUser(username)
      .then(x => {
        regDbg('User created, redirecting.');
        regDbg(x);
      }).catch(err => {
        throw new Error(err);
      });
      res.redirect('/');
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
