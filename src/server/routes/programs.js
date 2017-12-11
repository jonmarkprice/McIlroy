const saveDbg   = require('debug')('program-route:save'),
      deleteDbg = require('debug')('program-route:delete'),
      renameDbg = require('debug')('program-route:rename');
const express = require('express');
const bodyParser = require('body-parser');
const saveProgram = require('../save-program');
const deleteProgram = require('../delete-program');
const R = require('ramda');

const jsonParser = bodyParser.json();
const router = express.Router();
const empty = body => R.isEmpty(body) || R.isNil(body);

router.post('/delete', jsonParser, (req, res, next) => {
  deleteDbg('Got delete request: %O', req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/delete'));
  } 
  else {
    const {user, name} = req.body;
    deleteProgram(user, name)
    .then(data => {
      deleteDbg('Response from database: %O', data);
      res.sendStatus(200);
    });
  }
});

router.post('/save', jsonParser, (req, res, next) => {
  saveDbg('Got save request: %O', req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/save'));
  }
  else {
    saveProgram('test', req.body)
    .then(data => {
      saveDbg('Response from database: %O', data);
      res.sendStatus(200);
    });
  }
});

router.post('/rename', jsonParser, (req, res, next) => {
  renameDbg('Got rename request: %O', req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/rename'));
  }
  else {
    // TO BE IMPL.
    // const {oldName, newName} = _;
    // renameProgram('test', name, new_name);

    // XXX: unconditionally send request (until implemented).
    res.sendStatus(200);
  }
});

module.exports = router;
