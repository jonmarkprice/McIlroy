const test    = require('tape');
const { result } = require('../../common/lang/helpers');
const { Left, Right } = require('../../common/lang/lib/either');

// describe('cons', () => {
// it('should create a singleton list from atoms');

// describe('concat', () => {
// it('should only work on lists');
// TODO use Rambda append/concat instead of Array.prototype.concat

// describe('replicate', () => {
test('should return an empty list on 0', (assert) => {
  assert.deepEqual(result(1, 0, 'replicate', ':'), Right.of([]));
  assert.deepEqual(
    result(true, 3, 'replicate', ':'),
    Right.of([true, true, true])
  );
  assert.end();
});
// it('should return null unless the second argument is a non-negative integer');

// describe('zip', () => {
test('should work on two empty lists', (assert) => {
  assert.deepEqual(
    result([], [], 'zip', ':'),
    Right.of([])
  );
  assert.deepEqual(
    result(['a', 'b'], [1, 2, 3], 'zip', ':'),
    Right.of([['a', 1], ['b', 2]])
  );
  assert.end();
});

//describe('length', () => {
test('should return 0 from an empty list', (assert) => {
  assert.deepEqual(
    result([], 'length', ':'),
    Right.of(0)
  );
  assert.deepEqual(
    result([1, 'x', true, []], 'length', ':'),
    Right.of(4)
  );
  /* TODO: no type checking yet...
  assert.deepEqual(
    result(1, 'length', ':'),
    Left.of('...')
  );*/
  assert.end();
});

// describe('split', () => {
// it('should return null for an empty list');
