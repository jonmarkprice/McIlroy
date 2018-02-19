const express = require('express');
const router  = express.Router();

const { createElement } = require('react');
const { renderPage } = require('./helpers');

const app       = require('./app');
const api       = require('./api');
const login     = require('./login');
const register  = require('./register');

// Load components
const LoginPage   = require('../../../lib/components/LoginPage');
// const ProfilePage = require('../../../lib/components/ProfilePage');
const Home        = require('../../../lib/components/Home');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

// Define routes to outsource
router.use('/api', api);
router.use('/register', register);
router.use('/login', login);
router.use('/', app);

module.exports = router;
