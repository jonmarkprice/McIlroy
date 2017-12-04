const express = require('express');
const renderPage = require('../common/render');
const { User } = require('./schema');

const app = express();
const port = 3000;

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

// Don't re-query the database if the data is already in the store.
let reloads = 0;
app.get('/', (req, res) => {
  // if (reloads === 0) {
  query.then(docs => {
    if (Array.isArray(docs) && docs.length >= 0) {
      // XXX: if I run this, it will re-execute all of the functions
      // in the main scope.
      // OPTIONS: 
      // 1. don't separte
      // 2. move everything in main scope -> 'setup' function
      //  - PROBLEM: we loose access to store
      //    - IDEA: pass it as a param?
      res.send(renderPage(docs[0].programs));
    } else {
      res.sendStatus(400);
    }
  }).catch(err => console.error(err))
  // } else {
    // We've already retrieved the data, so it's already in the store.
    // renderPage([]);
  // }
});

console.log(`Listening on port ${port}...`);
app.listen(port);
