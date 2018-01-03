const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

const router = express.Router();

router.get('/', function (req, res, next) {
  const error = req.flash('error'); // or() and use _.error
  const state = error === undefined ? {flash: null} : {flash: error.join('')};

  // TODO: Look up "right" way, eg. with express-connect?
  //if (loggedOn(req.session)) {
  if (false) {
    res.redirect('/');
  } else {
    const styles = ['common', 'banner', 'form', 'register', 'flash'];
    const component = createElement(RegistrationPage, state);
    const html = renderPage(component, 'Register', null, styles, state);
    res.send(html);
  }
});

module.exports = router;
