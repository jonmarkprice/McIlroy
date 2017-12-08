// TODO: see ./bin/www from express generator

const bodyParser  = require('body-parser');
const renderPage  = require('./render');
const { User }    = require('./schema');
const saveProgram = require('./save-program');
const deleteProgram = require('./delete-program');

const express     = require('express');
const jsonParser = bodyParser.json();
// TODO serve-favicon

// Routes // TODO
// const index = require('./routes/index');
// const programs = require('./routes/programs');

const app = express();
const port = 3000;

// Static routes
app.use('/static', express.static('dist'));
app.use('/public', express.static('public'));

// app.use('/', index);
// app.use('/programs', programs);

// DEPRECATED //
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
  console.log("-- GOT SAVE REQUEST --");
  if (!req.body) res.sendStatus(400);

  // const {user, program} = req.body;
  saveProgram('test', req.body); // "test" = req.body.user
  res.sendStatus(200);
});

app.post('/program/rename', jsonParser, (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  
  // TO BE IMPL.
  // const {oldName, newName} = _;
  // renameProgram('test', name, new_name);

  console.log(" -- GOT RENAME REQUEST --");
  console.log(req.body);

  res.sendStatus(200);
});

// Catch 404
app.use(function (req, res, next) {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
 
// Error handler
app.use(function(err, req, res, next) {
  // set error iff in dev environment
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.sendStatus(err.status || 500);  
  // Not using res.render('error'); since we don't have a view engine.
});

console.log(`Running in: ${app.get('env')}`);
console.log(`Listening on port ${port}...`);
app.listen(port);

