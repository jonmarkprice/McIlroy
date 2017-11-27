const test    = require('tape');
const syntax  = require('../common/lib/syntax');
const { run } = require('./helpers');

test('should construct an empty list', (assert) => {
  assert.deepEqual(run('[',']'), []);
  assert.end();
});
test('should should construct a short, simple list', (assert) => {
  assert.deepEqual(run('[', 0, 1, 2, true, 'A', ']'), [0, 1, 2, true, 'A']);
  assert.end();
});
test('should construct a nested list', (assert) => {
  assert.deepEqual(run('[', 1, '[', 2, 3, '[', 4, ']', 5, ']', 6, ']'),
      [1, [2, 3, [4], 5], 6]);
  assert.end();
});
