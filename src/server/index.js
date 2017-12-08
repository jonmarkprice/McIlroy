const express     = require('express');
const bodyParser  = require('body-parser');
const renderPage  = require('./render');
const { User }    = require('./schema');
const saveProgram = require('./save-program');
const deleteProgram = require('./delete-program');

const jsonParser = bodyParser.json();
const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.use('/public', express.static('public'));

app.get('/', (req, res, next) => {
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

app.post('/program/delete', jsonParser, (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  console.log("-- GOT DELETE REQUEST --");
  console.log(req.body);

  const {user, name} = req.body;
  deleteProgram(user, name); // XXX user is ignored

  // XXX Don't unconditionally send success!!!
  res.sendStatus(200);
});

app.post('/program/save', jsonParser, (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  // console.log("-- GOT DATA --");
  // console.log(req.body);
  saveProgram('test', req.body); // "test" = req.body.user
  res.sendStatus(200);
});

console.log(`Listening on port ${port}...`);
app.listen(port);

