const renderInterpretter = require('../render');
const express = require('express');
const router = express.Router();
const dbg = require('debug')('routes:index');
const fetchPrograms = require("../database/fetch-programs");

router.get('/', function (req, res, next) {
  dbg("Serving main app at /.")
  if (req.user) {
    dbg("Fetching programs for: %s", req.user.username);
    dbg(req.user);    

    fetchPrograms(req.user.username)
    .then(function (programs) {
      dbg("Got programs: %O", programs);
      res.send(renderInterpretter(programs.Items, req.user.username));
    })
    .catch(function (err) {
      console.error("Couldn't get session", err);
      res.redirect("/login");
    })
  } else {
    console.log("Couldn't get user.");
    res.redirect("/login");
  }
});

module.exports = router;
