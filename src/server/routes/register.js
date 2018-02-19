const express = require('express');
const { createElement } = require('react');
const dbg = require("debug")("pages:register");

const { renderPage } = require('./helpers');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

const router = express.Router();

router.get('/', function (req, res, next) {
  const error = req.flash('error'); // or() and use _.error
  const state = error === undefined ? {flash: null} : {flash: error.join('')};

  dbg("req.session: %O", req.session);

  // Redirect if already logged on
  if (req.session.passport.user !== undefined) {
    res.redirect('/');
  } else {
    const styles = ['common', 'banner', 'form', 'register', 'flash'];
    const component = createElement(RegistrationPage, state);
    const html = renderPage(component, 'Register', null, styles, state);
    res.send(html);
  }
});

module.exports = router;
