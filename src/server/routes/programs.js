const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../schema');
const saveProgram = require('../save-program');
const deleteProgram = require('../delete-program');

const jsonParser = bodyParser.json();
const router = express.Router();

router.post('/delete', jsonParser, (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  console.log("-- GOT DELETE REQUEST --");
  console.log(req.body);

  const {user, name} = req.body;
  deleteProgram(user, name); // XXX user is ignored

  // XXX Don't unconditionally send success!!!
  res.sendStatus(200);
});

router.post('/save', jsonParser, (req, res, next) => {
  console.log("-- GOT SAVE REQUEST --");
  if (!req.body) res.sendStatus(400);

  // const {user, program} = req.body;
  saveProgram('test', req.body); // "test" = req.body.user
  res.sendStatus(200);
});

router.post('/rename', jsonParser, (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  
  // TO BE IMPL.
  // const {oldName, newName} = _;
  // renameProgram('test', name, new_name);

  console.log(" -- GOT RENAME REQUEST --");
  console.log(req.body);

  res.sendStatus(200);
});

module.exports = router;