const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master process running at ${process.pid}.`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // need on exit?
} else {
  const express   = require('express');
  const passport  = require('./passport');
  const router    = require('./routes');
  const flash     = require('connect-flash');
  
  // Create a new Express application.
  const app = express();
  
  app.use('/static', express.static('dist'));
  app.use('/public', express.static('public'));
  
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')()); // XXX Don't need
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(flash());
  
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use('/', router);
  console.log(`Worker ${process.pid} started.`);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, function() {
    console.log('Server running at http://127.0.0.1:' + port);
  }); 
}
