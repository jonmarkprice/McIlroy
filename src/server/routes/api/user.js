const loginDbg  = require('debug')('user-api:login');
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

module.exports = router;
