const loginDbg  = require('debug')('user-api:login');
const logoutDbg = require('debug')('user-api:logout');
const express = require('express');
const bodyParser = require('body-parser');
const { empty } = require('../helpers');

// const jsonParser = bodyParser.json();
const parser = bodyParser.urlencoded({extended: true});
const router = express.Router();

router.post('/login', parser, (req, res, next) => {
  loginDbg('Recieved login request %o.', req.body);
  loginDbg('Data %O:', req.body);
  req.session.user = {name: req.body.username, logged_in: true};
  res.redirect('/');
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

module.exports = router;
