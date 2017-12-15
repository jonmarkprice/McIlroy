const renderPage = require('../render');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function (req, res, next) {
  let username = 'ERROR';
  if (typeof req.session.user.name !== undefined) {
    username = req.session.user.name;
  }

  // TODO conside findOne instead
  const user = {name: 'test'};
  db.connection.User.find(user).exec() // returns a promise
  .then(docs => {
    if (Array.isArray(docs) && docs.length >= 0) {
      res.send(renderPage(docs[0].programs, username));
    } else {
      next(new Error(`User ${user.name} not found.`));
    }
  });
});

module.exports = router;
