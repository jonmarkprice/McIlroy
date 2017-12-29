const express = require('express');
const router  = express.Router();

const { createElement } = require('react');
const { renderPage } = require('./helpers');

const app       = require('./app');    // NEW
const api       = require('./api');
// const home      = require('./home');   // NEW
const login     = require('./login');
// const profile   = require('./profile');  // NEW
const register  = require('./register');

// Load components
const LoginPage   = require('../../../lib/components/LoginPage');
const ProfilePage = require('../../../lib/components/ProfilePage');
const Home        = require('../../../lib/components/Home');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

// Define routes to outsource
router.use('/api', api);
router.use('/register', register);
router.use('/login', login);
router.use('/', app);

// Handle these (for now!)
router.get('/home',
  function(req, res) {
    const component = createElement(Home, {user: req.user});
    const html      = renderPage(component, 'Home');
    res.send(html);
  });

/*
router.get('/login',
  function(req, res) {
    const styles    = ['common', 'banner', 'form', 'login'];
    const component = createElement(LoginPage, null);
    const html      = renderPage(component, 'Log In', null, styles);
    res.send(html); 
  });
*/

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    const component = createElement(ProfilePage, {user: req.user});
    const html = renderPage(component, 'Profile');
    res.send(html);
  });

/*
router.get('/register', function(req, res) {
  // ensure *not* logged in?
  const styles = ['common', 'banner', 'form', 'register'];
  const component = createElement(RegistrationPage, null);
  const html = renderPage(component, 'Register', null, styles);
  res.send(html);
});
*/

module.exports = router;
