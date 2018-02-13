const express     = require('express');
const bodyParser  = require('body-parser');
const passport    = require('passport');
const loginDbg    = require('debug')('user-api:login');
const regDbg      = require('debug')('user-api:register');
const { empty }   = require('../helpers');
const addUser     = require('../../database/add-user');

const parser = bodyParser.urlencoded({extended: true});
const router = express.Router();

router.use(parser);

// Does this need some parser middleware in front of it?
// Middleware not even calling my Strategy...
// Define routes. 
router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
  }),
  function(req, res) {
    loginDbg("Authenticated");
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

// Already using body-parser on everything..
router.post('/register', (req, res, next) => {
  // TODO I should scan username for legality (injection!) before scanning
  const {pw, pwConfirm, username} = req.body;
  regDbg("Data: %O", req.body);

  if (pw !== pwConfirm) {
    regDbg('Passwords do not match');
    req.flash('error', `Passwords do not match.`);
    res.redirect('/register');
  } else {
    addUser(username, pw)
    .then(function (user) {
      regDbg('User created, logging in...');
      req.login(user, function(err) {
        if (err) {
          loginDbg("Error logging in new user.");
          res.redirect("/login");
        } else {
          console.log("redirecting");
          res.redirect('/');
        }
     });
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
