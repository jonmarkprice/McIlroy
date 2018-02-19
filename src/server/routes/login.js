const express = require('express');
const { createElement } = require('react');
const { renderPage } = require('./helpers');
const LoginPage = require('../../../lib/components/LoginPage');
const dbg = require('debug')('pages:login');

const router = express.Router();

router.get('/', function (req, res, next) {
  const flash = req.flash();
  const state = flash.error === undefined
    ? {flash: null}
    : {flash: flash.error.join('')};

  dbg("req.session: %O", req.session);

  // Redirect if already logged on
  if (req.session.passport.user !== undefined) {
    dbg("Logged on, rerouting.");
    res.redirect('/');
  } else {
    dbg("Not logged on, displaying login page.");
    const html = renderPage(
      createElement(LoginPage, state),
      'Log In - McIlroy',
      'login',
      ['common', 'banner', 'form', 'login', 'flash'],
      state
    );
    res.send(html);
  }
});

module.exports = router;
