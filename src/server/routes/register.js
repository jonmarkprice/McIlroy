const express = require('express');
const { createElement } = require('react');
const { renderPage, loggedOn } = require('./helpers');
const RegistrationPage = require('../../../lib/components/RegistrationPage');

const router = express.Router();

router.get('/', function (req, res, next) {
  //if (loggedOn(req.session)) {
  if (false) {
    res.redirect('/');
  } else {
    const styles = ['common', 'banner', 'form', 'register'];
    const component = createElement(RegistrationPage, null);
    const html = renderPage(component, 'Register', null, styles);
    res.send(html);
  }
});

module.exports = router;
