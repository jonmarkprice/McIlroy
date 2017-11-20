const test    = require('tape');
const { result } = require('../../common/lang/helpers');
//const { Left, Right } = require('../../common/lang/lib/either');
const { Left, Right } = require('sanctuary');

test('Plus', (assert) => {
  assert.deepEqual(
    result(2, 1, '+', ':'),
    Right(3),
    'should add small integers'
  );
  
  assert.end();
});


// TODO: move to integration
test('expression', (assert) => {
  assert.deepEqual(
    result(3, 2, 3, '^', ':', '*', ':'),
    Right(24)
  );
  assert.end()
});


/*
describe('subtract', () => {
  it('should subtract two integers');
});
*/
test('Subtraction', (assert) => {
  assert.deepEqual(
    result(3, 2, '-', ':'),
    Right(1)
  );

  assert.end();
});


test('Multiplication', (assert) => {
  assert.deepEqual(
    result(7, 3, '*', ':'),
    Right(21),
    'should mulitply two integers'
  );

  assert.end();
});


test('Division', (assert) => {
  assert.deepEqual(
    result(42, 6, '/', ':'),
    Right(7),
    'should divide two integers'
  );

  assert.deepEqual(
    result(32, 0, '/', ':'),
    Right(Infinity), // TODO: eventually make this a Left()
    'should return null or NaN for division-by-zero'
  );

  assert.end();
});

test('Exponentiation', (assert) => {
  assert.deepEqual(
    result(7, 2, '^', ':'),
    Right(49),
    'should take one integer to the power of another'
  );

  assert.deepEqual(
    result(3, 0, '^', ':'),
    Right(1),
    'should return 1 if the second argument is 0'
  );

  assert.end();
});

test('Successor', (assert) => {
  assert.deepEqual(
    result(23, 'succ', ':'),
    Right(24),
    'should increment an integer'
  );

  // it('should return null for non-integers');

  assert.end();
});

test('Modulo', (assert) => {
  assert.deepEqual(
    result(29, 5, '%', ':'),
    Right(4),
    'should find the modulo of two integers'
  );

  assert.end();
});

// TODO implement (test-first) greater than, less than

 
