const { MongoClient } = require('mongodb');
const assert          = require('assert');
const co          = require('co'); // TODO install?

// Connection url
const url = 'mongodb://jon:pw@ds249415.mlab.com:49415/mcilroy';

co(function*() {
  // Connect to the database
  let db = yield MongoClient.connect(url);

  // Get the collection
  let col = db.collection('test');

  let docs = yield col.find({}).toArray();
  assert.equal(1, docs.length);
  console.log(docs[0].msg);
  db.close();
}).catch((err) => {
  console.log(err.stack);
});

/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to server.");
  db.close();
});
*/
