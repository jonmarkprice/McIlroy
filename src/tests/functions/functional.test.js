const test    = require('tape');
const { result } = require('../../common/lang/helpers');
const { Right, Left } = require('../../common/lang/lib/either');

test('Curry', (assert) => {
  assert.deepEqual(

    result(1, 2, '+', 'curry', ':', ':'),
    Right.of(3),
    'should be able to consume 1 argument'
  );
  
  assert.deepEqual(

    result([3, 18, 0], 1, '+', 'curry', ':', 'map', ':'),
    Right.of([4, 19, 1]),
    'a curried function can be mapped over a list'
  );
  
  assert.deepEqual(
    result([3, 12, 0], 2, '^', 'flip', ':', 'curry', ':', 'map', ':'),
    Right.of([9, 144, 0]),
    'should work with flip'
  );

  assert.deepEqual(
    result(3, 4, '+', 'curry', ':', 'curry', ':', ':'),
    Right.of(7),
    'should be chainable, e.g. cosume two arguments of a function'
  );

  assert.end();
});

test('Flip', (assert) => {
  assert.deepEqual(
    result(3, 7, '-', 'flip', ':', ':'),
    Right.of(7 - 3),
    'flip -'
  );
  
  assert.deepEqual(
    result('A', [], 'cons', 'flip', ':', ':'),
    Right.of(['A']),
    'flip cons'
  );
  
  assert.end();
});

test('Compose', (assert) => {
  assert.deepEqual(
    result('a', 'uppercase', [], 'cons', 'curry', ':', 'compose', ':', ':'),
    Right.of(['A']),
    'should be able to compose a curried function'
  );

  assert.deepEqual(
    result([], 'length', 'succ', 'compose', ':', ':'),
    Right.of(1),
    'should work for two unary functions'
  );

  assert.deepEqual(
    result([[], [1], [1, 2]], 'length', 'succ', 'compose', ':', 'map', ':'),
    Right.of([1, 2, 3]),
    'should be mappable'
  );

  assert.end();
});
