const test    = require('tape');
const { run } = require('../helpers');
const { result } = require('../../common/lang/helpers');
const { Left, Right } = require('../../common/lang/lib/either');

// describe('plus', () => {
test('Plus should add small integers', (assert) => {
  assert.equal(run(1, 1, '+', ':'), 2);

  assert.deepEqual(
    result(2, 1, '+', ':'),
    Right.of(3)
  );
  
  assert.end();
});

/*test('expression', (assert) => {
  assert.deepEqual(
    result(3, 2, 3, '^', ':', '*', ':'),
    Right.of(24)
  );
  assert.end()
}); */

test('exponent', (assert) => {
  assert.deepEqual(
    result(2, 3, '^', ':'),
    Right.of(8)
  );
  assert.end();
});

/*
describe('subtract', () => {
  it('should subtract two integers');
});
*/
test('subtract', (assert) => {
  assert.deepEqual(
    result(3, 2, '-', ':'),
    Right.of(1)
  );
  assert.end();
});
/*
describe('multiplication', () => {
  it('should mulitply two integers');
});

describe('division', () => {
  it('should divide two integers');
  it('should return null or NaN for division-by-zero')
});

describe('exponent', () => {
  it('should take one integer to the power of another');
  it('should return 1 if the second argument is 0')
});

describe('succ', () => {
  it('should increment an integer');
  it('should return null for non-integers');
});

describe('modulo', () => {
  it('should find the modulo of two integers');
});

// May not be necessary since we can implement with reduce
describe('sum', () => {
  it('should return 0 for an empty list');
  it('should return the only number for a singleton list');
  it('should sum small lists of integers');
});

// TODO implement (test-first) greater than, less than
*/
 
