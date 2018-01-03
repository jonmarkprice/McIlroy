const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const LoginPage = require('../../../lib/components/LoginPage');
const dbg = require('debug')('routes:login');

const router = express.Router();

router.get('/', function (req, res, next) {
  const flash = req.flash();
  const state = flash.error === undefined
    ? {flash: null}
    : {flash: flash.error.join('')};

  // TODO: "right way?" for passport?
  // if (loggedOn(req.session)) {
  if (false) {
    // Redirect if already logged oin
    dbg("Logged on, rerouting.");
    res.redirect('/');
  } else {
    dbg("Not logged on, displaying login page.");
    const html = renderPage(
      createElement(LoginPage, state),
      'Log In - McIlroy',
      'login',
      ['common', 'banner', 'form', 'login', 'flash'],
      state, 
    );
    res.send(html);
  }
});

module.exports = router;
