const express = require('express');
const router = express.Router();
const { renderPage, loggedOn } = require('./helpers');

router.get('/', function (req, res, next) {
  if (loggedOn(req.session)) {
    // Redirect if already logged on
    res.redirect('/');
  } else {
    const html = renderPage(
      'Login - McIlroy',
      'login',
      ['common', 'banner', 'form', 'login']
    );
    res.send(html);
  }
});

module.exports = router;
