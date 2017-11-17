const test = require('tape');
const { result } = require('../../common/lang/helpers');
const { Left, Right } = require('../../common/lang/lib/either');

test('Equal', (assert) => {
  assert.deepEqual(
    result(0, 0, '=', ':'), 
    Right.of(true),
    'Equal should compare numbers'
  );

  assert.deepEqual(
    result([1, true, '3'], [1, true, '3'], '=', ':'),
    Right.of(true),
    'should work for lists'
  );

  assert.deepEqual(
    result([true, 1, '3'], [true, true, '3'], '=', ':'),
    Right.of(false), 
    '1 != true'
  );

  assert.end();
});

test('Identity', (assert) => {
  assert.deepEqual(
    result(72, 'id', ':'),
    Right.of(72),
    'should work for integers'
  );

  assert.deepEqual(
    result('X', 'id', ':'),
    Right.of('X'),
    'should work for characters'
  );

  assert.deepEqual(
    result(false, 'id', ':'),
    Right.of(false),
    'should work for booleans'
  );

  assert.deepEqual(
    result([1, true, '3'], 'id', ':'),
    Right.of([1, true, '3']),
    'should work for lists'
  );

  assert.end();
});
