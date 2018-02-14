const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const dbg = require("debug")("server");

if (cluster.isMaster) {
  dbg(`Master process running at ${process.pid}.`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // need on exit?
} else {
  const express   = require('express');
  const passport  = require('./passport');
  const router    = require('./routes');
  const flash     = require('connect-flash');

  const session   = require("express-session");
  const FileStore = require("session-file-store")(session);
  
  // Create a new Express application.
  const app = express();
  
  app.use('/static', express.static('dist'));
  app.use('/public', express.static('public'));
  
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  // app.use(require('cookie-parser')()); // XXX Don't need
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: true, // TODO
    store: new FileStore()
  }));
  app.use(flash());
  
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use('/', router);
  dbg(`Worker ${process.pid} started.`);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, function() {
    dbg('Server running at http://127.0.0.1:' + port);
  }); 
}
