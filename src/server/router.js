const express = require('express');
const router  = express.Router();
const R       = require('ramda');

router.get('/', (req, res, next) => {
  // return res.send('working');

  // Not 100% sure where this should go:
  const props = ['email', 'username', 'password', 'passwordConf'];
  if (R.all(x => R.has(x, req.body), props)) {
    const userData = {
      email         : req.body.email,
      username      : req.body.username,
      password      : req.body.password
      passwordConf  : req.body.passwordConf
    };
  
    User.create(userData, (err, user) => {
      if (err) return next(err);
      else return res.redirect('/profile');
    });
  }
  else return res.end('working');
});

module.exports = router;
