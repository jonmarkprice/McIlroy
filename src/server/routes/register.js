const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

const router = express.Router();

router.get('/', function (req, res, next) {
  if (loggedOn(req.session)) {
    res.redirect('/');
  } else {
    const html = renderPage(
      createElement(RegistrationPage, null),
      'Register - McIlroy',
      'register',
      ['common', 'banner', 'form', 'register']
    );
    res.send(html);
  }
});

module.exports = router;
