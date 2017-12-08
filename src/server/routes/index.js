const { User } = require('../schema');
const renderPage = require('../render');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  // findOne instead
  User.find({name: 'test'}).exec() // returns a promise
  .then(docs => {
    if (Array.isArray(docs) && docs.length >= 0) {
      res.send(renderPage(docs[0].programs));
    } else {
      res.sendStatus(400);
    }
  }).catch(err => {
    // The promise was rejected
    console.log("Cannot find user test");
    console.error(err);
    res.sendStatus(500);  // send internal server error
    // res.send(err);     // Consider sending up detailed diagnostics
  })
});

module.exports = router;