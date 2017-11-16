const test = require('tape');
const { run } = require('../helpers'); // XXX DEPRECATED
const { Left, Right } = require('../../common/lang/lib/either');
const { result } = require('../../common/lang/helpers');
// Any function that applies a function it takes as an argument

test('apply', (assert) => {
  // should apply a function in the second argument to the list of arguments
  assert.deepEqual(
    result([0], 'id', 'apply', ':'),
    Right.of(0)
  );
  assert.deepEqual(
    result([1, 5], '+', 'apply', ':'),
    Right.of(6)
  ); 
  assert.end();
});

//describe('eval', () => {
test('eval', (assert) => {
  // should evaluate to a single argument 
  assert.equal(run([0, 'id'], 'eval', ':'), 0);
  
  // should fail
  assert.deepEqual(
    result([0, 'id'], 'eval', ':'), // This tests whether tokenize is recursive.
    Right.of(0)
  );

  assert.end();
});

// describe('map', () => {
test('map', (assert) => {
  // Map should do nothing to an empty list
  assert.deepEqual(
    result([], 'id', 'map', ':'),
    Right.of([])
  );

  assert.deepEqual(
    result(['h', 'i', '!'], 'uppercase', 'map', ':'),
    Right.of(['H', 'I', '!'])
  );

  assert.end();
});

test('reduce', (assert) => {
  // Reduce should return its third argument if given an empty list.'
  assert.equal(run([], 'id', 0, 'reduce', ':'), 0);
  assert.equal(run([], 'id', true, 'reduce', ':'), true);
  assert.equal(run([], 'id', 'a', 'reduce', ':'), 'a');
  assert.deepEqual(run([], 'id', [], 'reduce', ':'), []);
  assert.end();
});

// describe('filter'); // Can be implement with reduce
