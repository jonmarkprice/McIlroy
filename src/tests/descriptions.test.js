const descriptions = require('../common/lib/descriptions');
const { run } = require('./helpers');
const test = require('tape');

test('should have an in and expect field for each example', (assert) => {
  // TODO: Make a similar test for library
  for (let desc in descriptions) {
    if (desc.hasOwnProperty('example')) {
      assert.equal(desc.hasOwnProperty('in'), true);
      assert.equal(desc.hasOwnProperty('expect'), true);

      assert.deepEqual(run(desc.in), desc.expect);
    }
  } 
  assert.end();
});

test('should have the expected result for each example', (assert) => {
  for (let desc in descriptions) {
    if (desc.hasOwnProperty('example')) {
      assert.deepEqual(run(desc.in), desc.expect);
    }
  }
  assert.end();
});
