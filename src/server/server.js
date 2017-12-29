const express   = require('express');
const passport  = require('./passport');
const db        = require('./db');
const router    = require('./routes');

// Create a new Express application.
const  app = express();

app.use('/public', express.static('public'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


// Connect to database
db.connect();
console.log("Connection status: %s", db.isConnected);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.listen(3000);
