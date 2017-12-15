const loginDbg  = require('debug')('user-api:login');
const express = require('express');
const bodyParser = require('body-parser');
const { empty } = require('../helpers');

const jsonParser = bodyParser.json();
const router = express.Router();

router.post('/login', jsonParser, (req, res, next) => {
  loginDbg('Recieved login request.');
  if (empty(req.body)) {
    next(new Error('No data with /api/user/login'));
  }
  else {
    const {username} = req.body; // Really we should be checking what happens
                                 // after this to ensure that no variables
                                 // remain undefined, rather than empty().
    loginDbg("Logging in: %s", username);
  }
});

module.exports = router;
