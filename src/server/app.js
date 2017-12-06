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
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

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
app.use('/public', express.static('public'));

// Not sure if I need/want this
// app.use(bodyParser.urlencoded({ extended: false });
// app.use(bodyParser.json());

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

app.post('/user/test/add-program', jsonParser, (req, res) => {
  // res.setHeader('Content-Type', 'text/plain');
  if (!req.body) res.sendStatus(400);
  
  console.log("-- Got --");
  console.log(req.body);
  
  //console.log(typeof req.body); // string or obj?
  // res.sendStatus(200);

  // TODO: ensure that req.body follows correct form  

  query.then(docs => {
    if (docs.length == 0) res.sendStatus(404);
  
    docs[0].programs.push(req.body);
    console.log("-- Updated test user --");
    console.log(docs[0]);
    return docs[0].save((err, data) => new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }));
  }).then(data => {
    console.log(data);
    console.log('Added new program');
    res.sendStatus(200);
    // process.exit(0);
  }).catch(err => console.log('Error: ' + err));
  // */

  // res.sendStatus(200);
});

console.log(`Listening on port ${port}.`);
app.listen(port);

