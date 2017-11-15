const test    = require('tape');
//const { result } = require('../helpers');
const { result } = require('../../common/lang/helpers');
const { Left, Right } = require('../../common/lang/lib/either');

const True  = Right.of(true);
const False = Right.of(false)

test('Not should implement the truth-table for NOT', (assert) => {
  assert.deepEqual(result(true, 'not', ':'), False);
  assert.deepEqual(result(false, 'not', ':'), True);
  assert.end();
});
// it('should return null for non-logic input');

test('And should implement the truth-table for AND', (assert) => {
  assert.deepEqual(result(false, false, 'and', ':'), False);
  assert.deepEqual(result(false, true, 'and', ':'), False);
  assert.deepEqual(result(true, false, 'and', ':'), False);
  assert.deepEqual(result(true, true, 'and', ':'), True);
  assert.end();
});
// it('And should return null for non-logic input');

test('should implement the truth-table for inclusive OR', (assert) => {
  assert.deepEqual(result(false, false, 'or', ':'), False);
  assert.deepEqual(result(false, true, 'or', ':'), True);
  assert.deepEqual(result(true, false, 'or', ':'), True);
  assert.deepEqual(result(true, true, 'or', ':'), True);
  assert.end();
});
// it('should return null for non-logic input');

//describe('cond') // XXX currently deprecated
