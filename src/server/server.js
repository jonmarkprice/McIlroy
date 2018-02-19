const dbg = require("debug")("server");

if (process.env.DEPLOYMENT !== "AWS") {
  dbg("Not on AWS, loading local environment variables from .env");
  require("dotenv").config();
  // dbg("Process.env dump: %O", process.env);
  dbg("Deployment: ", process.env.DEPLOYMENT);
  dbg("Tables: ");
  dbg("Users: ", process.env.USERS_TABLE);
  dbg("Programs: ", process.env.PROGRAMS_TABLE);
}

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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
 
  const DynamoDBStore = require("./store");
  // const FileStore = require("session-file-store")(session);
  
  // Create a new Express application.
  const app = express();
  
  app.use('/static', express.static('dist'));
  app.use('/public', express.static('public'));
  
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    store: new DynamoDBStore({table: "SessionTest"})
    //store: new FileStore({path: '../../sessions'}) // See:
      // https://github.com/valery-barysok/session-file-store/issues/41
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
