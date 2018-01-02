const test = require('tape');
const { result } = require('../../src/common/parser/helpers');
const { wrap } = require('../../src/common/parser/type');

const True  = wrap(true);
const False = wrap(false)

test('NOT', (assert) => {
  assert.deepEqual(result(true, 'not', ':'), False);
  assert.deepEqual(result(false, 'not', ':'), True);
  assert.end();
});
// it('should return null for non-logic input');

test('AND', (assert) => {
  assert.deepEqual(result(false, false, 'and', ':'), False);
  assert.deepEqual(result(false, true, 'and', ':'), False);
  assert.deepEqual(result(true, false, 'and', ':'), False);
  assert.deepEqual(result(true, true, 'and', ':'), True);
  assert.end();
});
// it('And should return null for non-logic input');

test('OR', (assert) => {
  assert.deepEqual(result(false, false, 'or', ':'), False);
  assert.deepEqual(result(false, true, 'or', ':'), True);
  assert.deepEqual(result(true, false, 'or', ':'), True);
  assert.deepEqual(result(true, true, 'or', ':'), True);
  assert.end();
});
// it('should return null for non-logic input');

//describe('cond') // XXX currently deprecated
