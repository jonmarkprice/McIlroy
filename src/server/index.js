const express = require('express');
const qs = require('qs');
const renderPage  = require('../common/render');

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.get('/', (req, res) => {
  const params = qs.parse(req.query);
  const message = params.msg || "Redux";

  res.send(renderPage(message));
});

console.log(`Listening on port ${port}...`);
app.listen(port);
