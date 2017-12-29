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
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    const component = createElement(ProfilePage, {user: req.user});
    const html = renderPage(component, 'Profile');
    res.send(html);
  });

module.exports = router;
