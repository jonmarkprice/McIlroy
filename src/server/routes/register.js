const express = require('express');
const router = express.Router();
const { renderPage, loggedOn } = require('./helpers');

router.get('/', function (req, res, next) {
  if (loggedOn(req.session)) {
    res.redirect('/');
  } else {
    const html = renderPage(
      'Register - McIlroy',
      'register',
      ['common', 'banner', 'form', 'register']
    );
    res.send(html);
  }
});

module.exports = router;
