// TODO: see ./bin/www from express generator
require('dotenv').config(); // add environmental variables
const express = require('express');
const session = require('express-session');

// TODO: Later use monogo-connect
const FileStore = require('session-file-store')(session);

const dbg = require('debug')('server-root');
const db = require('./db');

const app = express();
const port = 3000;

// set up sessions
app.use(session({ // Review these settings when connecting to db.
  name: 'McIlroy',
  secret: 'keyboard cat',
  saveUnitialized: true,
  resave: true,
  store: new FileStore(),
}));

// set up session data with sane defaults
app.use(function initSession(req, res, next) {
  if (typeof req.session.user === 'undefined') {
    req.session.user = {name: null, logged_in: false};
  }
  next();
});

app.use('/static', express.static('dist'));
app.use('/public', express.static('public'));

app.use('/login', require('./routes/login'));
app.use('/api',   require('./routes/api'));
app.use('/', require('./routes/index'));

// Connect to database
try {
  dbg("Connecting to database...");
  db.connect();
  dbg("Is connected: %s", db.isConnected);
} catch (err) {
  dbg("Cannot connect to database. Error: %O", err);
}

// Catch 404
app.use(function (req, res, next) {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
 
// Error handler
app.use(function(err, req, res, next) {
  dbg('Reached top-level error handler.');
  if (err.message !== undefined) {
    dbg(err.message); // We just want the message if Error()
  } else {
    dbg(err.message);
  }

  // set error iff in dev environment
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.sendStatus(err.status || 500);  
  // Not using res.render('error'); since we don't have a view engine.
});

dbg(`Running in: ${app.get('env')}`);
dbg(`Listening on port ${port}...`);
app.listen(port);

