const test = require('tape');
const { Left, Right } = require('../../common/lang/lib/either');
const { result } = require('../../common/lang/helpers');

// NOTE: By "applicative", I mean any function that applies a function it takes as an argument.

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

test('eval', (assert) => {
  // should evaluate to a single argument 
  assert.deepEqual(
    result([0, 'id'], 'eval', ':'), // This tests whether tokenize is recursive.
    Right.of(0)
  );

  assert.end();
});

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
  assert.deepEqual(
    result([], 'id', 0, 'reduce', ':'),
    Right.of(0)
  );
  
  assert.deepEqual(
    result([], 'id', true, 'reduce', ':'),
    Right.of(true)
  );

  assert.deepEqual(
    result([], 'id', 'a', 'reduce', ':'),
    Right.of('a')
  );

  assert.deepEqual(
    result([], 'id', [], 'reduce', ':'),
    Right.of([])
  );

  assert.end();
});

// describe('filter'); // Can be implement with reduce
