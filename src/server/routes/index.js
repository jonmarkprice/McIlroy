const renderInterpretter = require('../render');
const express = require('express');
const router = express.Router();
const db = require('../db');
const dbg = require('debug')('routes:index');

router.get('/', function (req, res, next) {
  if (typeof req.session.user !== 'undefined'
      && req.session.user.name !== null
      && req.session.user.logged_in
  ) {
    const username = req.session.user.name;
    const user = {name: username};

    db.connection.User.find(user).exec() // returns a promise
    .then(docs => {
      if (Array.isArray(docs) && docs.length > 0) {
        dbg('user: %o', docs[0]);
        dbg('docs: %o', docs);
       res.send(renderInterpretter(docs[0].programs, username));
      } else {
        next(new Error(`User ${user.name} not found.`));
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
