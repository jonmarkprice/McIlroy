// TODO: see ./bin/www from express generator

// const bodyParser  = require('body-parser');
const express     = require('express');
// const jsonParser = bodyParser.json();
// TODO serve-favicon

// Routes
const index = require('./routes/index');
const programs = require('./routes/programs');

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.use('/public', express.static('public'));
app.use('/program', programs);
app.use('/', index);

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

