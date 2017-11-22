const test = require('tape');
const { result } = require('../../common/lang/helpers');
const { wrap } = require('../../common/lang/type');

test('Equal', (assert) => {
  assert.deepEqual(
    result(0, 0, '=', ':'), 
    wrap(true),
    'Equal should compare numbers'
  );

  assert.deepEqual(
    result([1, true, '3'], [1, true, '3'], '=', ':'),
    wrap(true),
    'should work for lists'
  );

  assert.deepEqual(
    result([true, 1, '3'], [true, true, '3'], '=', ':'),
    wrap(false), 
    '1 != true'
  );

  assert.end();
});

test('Identity', (assert) => {
  assert.deepEqual(
    result(72, 'id', ':'),
    wrap(72),
    'should work for integers'
  );

  assert.deepEqual(
    result('X', 'id', ':'),
    wrap('X'),
    'should work for characters'
  );

  assert.deepEqual(
    result(false, 'id', ':'),
    wrap(false),
    'should work for booleans'
  );

  assert.deepEqual(
    result([1, true, '3'], 'id', ':'),
    wrap([1, true, '3']),
    'should work for lists'
  );

  assert.end();
});
