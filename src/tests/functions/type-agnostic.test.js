const test    = require('tape');
const { run } = require('../helpers');

test('Equal should compare numbers', (assert) => {
  assert.equal(run(0, 0, '=', ':'), true);
  assert.end();
});

// test('id should work for integers');
