const test = require('tape');
const { run } = require('../helpers'); // XXX DEP
const { Left, Right } = require('../../common/lang/lib/either');
const { result } = require('../../common/lang/helpers');
// Any function that applies a function it takes as an argument

//describe('apply', () => {
test('should apply a function in the second argument to the list of arguments',
(assert) => {
  // assert.equal(run([0], 'id', 'apply', ':'), 0);
  assert.deepEqual(
    result([0], 'id', 'apply', ':'),
    Right.of(0)
  );

  // assert.equal(run([1, 5], '+', 'apply', ':'), 1 + 5);
  assert.deepEqual(
    result([1, 5], '+', 'apply', ':'),
    Right.of(6)
  );
  assert.end();
});

//describe('eval', () => {
test('should evaluate to a single argument', (assert) => {
  assert.equal(run([0, 'id'], 'eval', ':'), 0);
  assert.end();
});

// describe('map', () => {
test('should do nothing to an empty list', (assert) => {
  assert.deepEqual(run([], 'id', 'map', ':'), []);
  assert.end();
});
// TODO: it('should map a unary function over a small list');

//describe('reduce', () => {
test('should return its third argument if given an empty list.',    
(assert) => {
  assert.equal(run([], 'id', 0, 'reduce', ':'), 0);
  assert.equal(run([], 'id', true, 'reduce', ':'), true);
  assert.equal(run([], 'id', 'a', 'reduce', ':'), 'a');
  assert.deepEqual(run([], 'id', [], 'reduce', ':'), []);
  assert.end();
});

// describe('filter'); // Can be implement with reduce
