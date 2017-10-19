const Express = require('express');
const render  = require('../common/render');
//const fs = require('fs');
//const path = require('path');

const app = Express();
const port = 3000;

app.use('/static', Express.static('dist'));
app.get('/', (req, res) => {
  res.send(render());
});

console.log(`Listening on port ${port}...`);
app.listen(port);
