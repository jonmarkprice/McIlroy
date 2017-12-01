const express = require('express');
const renderPage = require('../common/render');

const app = express();
const port = 3000;

app.use('/static', express.static('dist'));
app.use('/public', express.static('common/public'));
app.get('/', (req, res) => {
  res.send(renderPage());
});

console.log(`Listening on port ${port}...`);
app.listen(port);
