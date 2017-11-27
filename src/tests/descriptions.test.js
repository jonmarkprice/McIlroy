//const descriptions = require('../common/lib/descriptions');
//const { run } = require('./helpers');
const descriptions = require('../common/lang/descriptions');
const { result } = require('../common/lang/helpers');
const { wrap } = require('../common/lang/type');
const test = require('tape');

descriptions.forEach((desc, key) => {
  if (desc.hasOwnProperty('example')) {
    test(`${key}'s example is complete`, assert => {
      assert.true(desc.example.hasOwnProperty('in'));
      assert.true(desc.example.hasOwnProperty('expect'));
      assert.end();
    });
  }
});

descriptions.forEach((desc, key) => {
  if (desc.hasOwnProperty('example')) {
    test(`${key}'s example is correct`, assert => {
      assert.deepEqual(result(...desc.example.in), wrap(desc.example.expect));
      assert.end();
    });
  }
});

