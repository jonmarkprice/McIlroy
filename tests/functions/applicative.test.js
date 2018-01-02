const test = require('tape');
const { result }  = require('../../src/common/parser/helpers');
const { wrap }    = require('../../src/common/parser/type');

// NOTE: By "applicative", I mean any function that applies a function it takes as an argument.

test('apply', (assert) => {
  // should apply a function in the second argument to the list of arguments
  assert.deepEqual(
    result([0], 'id', 'apply', ':'),
    wrap(0)
  );

  assert.deepEqual(
    result([1, 5], '+', 'apply', ':'),
    wrap(6)
  );
 
  assert.end();
});

test('eval', (assert) => {
  // should evaluate to a single argument 
  assert.deepEqual(
    result([0, 'id'], 'eval', ':'), // This tests whether tokenize is recursive.
    wrap(0)
  );

  assert.end();
});


test('map', (assert) => {
  // Map should do nothing to an empty list
  assert.deepEqual(
    result([], 'id', 'map', ':'),
    wrap([])
  );

  assert.deepEqual(
    result(['h', 'i', '!'], 'uppercase', 'map', ':'),
    wrap(['H', 'I', '!'])
  );

  assert.end();
})

test('reduce', (assert) => {
  // Reduce should return its third argument if given an empty list.'
  assert.deepEqual(
    result([], 'id', 0, 'reduce', ':'),
    wrap(0)
  );
  
  assert.deepEqual(
    result([], 'id', true, 'reduce', ':'),
    wrap(true)
  );

  assert.deepEqual(
    result([], 'id', 'a', 'reduce', ':'),
    wrap('a')
  );

  assert.deepEqual(
    result([], 'id', [], 'reduce', ':'),
    wrap([])
  );

  assert.end();
});

// describe('filter'); // Can be implement with reduce
