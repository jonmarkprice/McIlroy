const Express = require('express');
const renderPage  = require('../common/render');
//const fs = require('fs');
//const path = require('path');

const app = Express();
const port = 3000;

app.use('/static', Express.static('dist'));
app.get('/', (req, res) => {
  res.send(renderPage());
});

console.log(`Listening on port ${port}...`);
app.listen(port);
