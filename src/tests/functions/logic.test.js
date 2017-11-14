const test    = require('tape');
const { run } = require('../helpers');
const { ap, fn, tok, True, False } = require('../tokens');
const { parse } = require('../../common/lang/helpers');

test('Not should implement the truth-table for NOT', (assert) => {
  assert.deepEqual(parse(True, fn.not, ap), False);
  assert.deepEqual(parse(False, fn.not, ap), True);
  assert.end();
});
// it('should return null for non-logic input');

test('And should implement the truth-table for AND', (assert) => {
  assert.deepEqual(parse(False, False, fn.and, ap), False);
  assert.deepEqual(parse(False, True, fn.and, ap), False);
  assert.deepEqual(parse(True, False, fn.and, ap), False);
  assert.deepEqual(parse(True, True, fn.and, ap), True);
  assert.end();
});
// it('And should return null for non-logic input');

test('should implement the truth-table for inclusive OR', (assert) => {
  assert.equal(run(false, false, 'or', ':'), false);
  assert.equal(run(false, true, 'or', ':'), true);
  assert.equal(run(true, false, 'or', ':'), true);
  assert.equal(run(true, true, 'or', ':'), true);
  assert.end();
});
// it('should return null for non-logic input');

//describe('cond') // XXX currently deprecated
