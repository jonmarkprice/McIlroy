const express = require('express');
const app = express();
const routes = require('./router');

app.use(express.static(__dirname + '/template'));
app.use('/', routes);

// Catch error 404
app.use((req, res, next) => {
  const err = new Error('File Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});

