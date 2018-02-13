const saveDbg   = require('debug')('program-route:save'),
      deleteDbg = require('debug')('program-route:delete'),
//    editDbg   = require('debug')('program-route:edit');
      fetchDbg  = require('debug')('program-route:fetch');
const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const router = express.Router();

// Actions
const saveProgram = require('../../database/save-program');
const deleteProgram = require('../../database/delete-program');
const fetchPrograms = require('../../database/fetch-programs');

// Routes
router.post('/fetch', jsonParser, (req, res, next) => {
  fetchDbg("Got fetch request: %O", req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/fetch'));
  } else {
    const { user } = req.body;
    fetchPrograms(user)
    .then(data => {
      fetchDbg("Response from database: %O", data);
      res.json(data); // subset? ie. data.Items?
    })
    .catch(next);
  }
});

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
    })
    .catch(next);
  }
});

router.post('/save', jsonParser, (req, res, next) => {
  saveDbg('Got save request: %O', req.body);
  if (empty(req.body)) {
    next(new Error('No data with /program/save'));
  }
  else {
    const {user, name, expansion} = req.body;
    saveProgram(user, name, expansion)
    .then(data => {
      saveDbg('Response from database: %O', data);
      res.sendStatus(200);
    })
    .catch(next);
  }
});

module.exports = router;
