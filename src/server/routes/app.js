const renderInterpretter = require('../render');
const express = require('express');
const router = express.Router();
const db = require('../db');
const dbg = require('debug')('routes:index');

router.get('/', function (req, res, next) {
  if (req.user) {
    const user = {username: req.user.username};
    db.connection.User.findOne(user).exec() // returns a promise
    .then(user => {
      // if (Array.isArray(docs) && docs.length > 0) {
      if (user !== null) {
        dbg('user: %o', user);
        res.send(renderInterpretter(user.programs, req.user.username));
      } else {
        next(new Error(`User ${user.username} not found.`));
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
