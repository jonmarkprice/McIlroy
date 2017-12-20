const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const LoginPage = require('../../../lib/components/LoginPage');

// TODO, for SSR:
// 1. [x] move actual (react) render into renderPage
// 2. [ ] move non-JSX createElement call *here*
// 3. [ ] pass ^ to renderPage
// 4. [x] call hydrate in client instead of render
const router = express.Router();

router.get('/', function (req, res, next) {
  if (loggedOn(req.session)) {
    // Redirect if already logged on
    res.redirect('/');
  } else {
    const html = renderPage(
      createElement(LoginPage, null),
      'Login - McIlroy',
      'login',
      ['common', 'banner', 'form', 'login']
    );
    res.send(html);
  }
});

module.exports = router;
