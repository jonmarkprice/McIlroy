const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const LoginPage = require('../../../lib/components/LoginPage');
const dbg = require('debug')('routes:login');

const router = express.Router();

router.get('/', function (req, res, next) {
  if (loggedOn(req.session)) {
    // Redirect if already logged oin
    dbg("Logged on, rerouting.");
    res.redirect('/');
  } else {
    dbg("Not logged on, displaying login page.");
    const html = renderPage(
      createElement(LoginPage, null),
      'Log In - McIlroy',
      'login',
      ['common', 'banner', 'form', 'login']
    );
    res.send(html);
  }
});

module.exports = router;
