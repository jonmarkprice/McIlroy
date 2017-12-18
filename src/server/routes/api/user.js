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

  // Mock authentication
  const user = req.body.username;
  if (user === 'admin' || user === 'test') {

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
