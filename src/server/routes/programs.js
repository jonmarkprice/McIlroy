const saveDbg   = require('debug')('program-route:save'),
      deleteDbg = require('debug')('program-route:delete'),
      editDbg = require('debug')('program-route:edit');
const express = require('express');
const bodyParser = require('body-parser');
const saveProgram = require('../save-program');
const deleteProgram = require('../delete-program');
const editProgram = require('../edit-program');
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

router.post('/edit', jsonParser, (req, res, next) => {
  editDbg('Got rename request: %j', req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/rename'));
  }
  else {
    const {user, oldName, newName, newProgram} = req.body;
    editDbg(newProgram);
    editProgram(user, oldName, newName, newProgram)
    .then(data => {
      editDbg('Updated program on server.');
      res.sendStatus(200);
    });
  }
});

module.exports = router;
