// This should be a simple express server that reads for the database and
// serves up some pages. All pages should Isomorphic and be built with React.
// Thus this should be somewhat of a union between 
// 1. server/index.js
// 2. common/render.js
// 3. server/get-programs

const express = require('express');
const { User } = require('./schema');
// TODO: better names
const { render___, error___ } = require('./pages');

const app = express();
const port = 3002;

const query = User.find({name: 'test'}, (err, docs) =>  
  new Promise((resolve, reject) => {
    if (err) {
      reject(err);
    } else {
      resolve(docs);
    }   
  })
);

app.use('/static', express.static('dist'));
app.use('/public', express.static('common/public'));

// TODO: How can we ensure that the database has been loaded before
// we do res.send? ... simple just call all of the database code from
// within app.get().
app.get('/', (req, res) => {
  query
  .then(docs => {
      console.log("--- calling render ---");
      res.send(render___(docs));
  })
  .catch(err => res.send(error___(err)));
});

console.log(`Listening on port ${port}.`);
app.listen(port);

