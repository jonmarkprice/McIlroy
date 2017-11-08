const test    = require('tape');
const { run } = require('../helpers');

test('Not should implement the truth-table for NOT', (assert) => {
  assert.equal(run(false, 'not', ':'), true);
  assert.equal(run(true, 'not', ':'), false);
  assert.end();
});
// it('should return null for non-logic input');

test('And should implement the truth-table for AND', (assert) => {
  assert.equal(run(false, false, 'and', ':'), false);
  assert.equal(run(false, true, 'and', ':'), false);
  assert.equal(run(true, false, 'and', ':'), false);
  assert.equal(run(true, true, 'and', ':'), true);
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
