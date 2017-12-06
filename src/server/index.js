const express = require('express');
const renderPage = require('../common/render');
const { User } = require('./schema');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const saveProgram = require('./save-program');

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.use('/public', express.static('common/public'));

// Don't re-query the database if the data is already in the store.
app.get('/', (req, res) => {
  User.find({name: 'test'})
  .exec() // returns a promise
  .then(docs => {
    if (Array.isArray(docs) && docs.length >= 0) {
      res.send(renderPage(docs[0].programs));
    } else {
      res.sendStatus(400);
    }
  // Pass up data to server
  // e.g. using res.sendStatus()
  }).catch(err => console.error(err))
  // } else {
    // We've already retrieved the data, so it's already in the store.
    // renderPage([]);
  // }
});


app.post('/user/test/save-program', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  console.log("-- GOT DATA --");
  console.log(req.body);
  saveProgram('test', req.body);

  res.sendStatus(200);
});

console.log(`Listening on port ${port}...`);
app.listen(port);

