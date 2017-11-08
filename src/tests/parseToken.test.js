const test = require('tape');
const { parseToken } = require('../common/lib/parser');

test('should convert raw types into wrapped ones.', (assert) => {
  assert.deepEqual(parseToken(true), {'type': 'boolean', value: true});
  assert.end();
});
