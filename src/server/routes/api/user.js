const express     = require('express');
const bodyParser  = require('body-parser');
const passport    = require('passport');
const loginDbg    = require('debug')('user-api:login');
const regDbg      = require('debug')('user-api:register');
const { empty }   = require('../helpers');
const addUser     = require('../../add-user');

const parser = bodyParser.urlencoded({extended: true});
const router = express.Router();

// Define routes. 
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', 
                                   failureFlash: 'Invalid username or password.' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.post('/register', parser, (req, res, next) => {
  // TODO I should scan username for legality (injection!) before scanning
  const {pw, pwConfirm, username} = req.body;
  if (pw !== pwConfirm) {
    regDbg('Passwords do not match');
    req.flash('error', `Passwords do not match.`);
    res.redirect('/register');
  } else {
    addUser(username, pw)
    .then(user => {
      regDbg("Adding user...");
      if (user !== undefined) {
        regDbg('User created, redirecting.');
        // Log new user in.
        req.login(user, function(err) {
          if (err) return next(err);
          res.redirect('/');
        });
      } else {
        return next('Got undefined from save().');
      }
    })
    .catch(err => {
      if (err === 'USERNAME EXISTS') {
        req.flash('error', `Username "${username}" is not available.`);
        res.redirect('/register');
      }
      else {
        regDbg('Reached top-level registration error-handler with %s', err);
        regDbg('- Full printout: %O', err);
        req.flash('error', 'Error creating user.');
        res.redirect('/register');
      }
    });
  }
});

module.exports = router;
