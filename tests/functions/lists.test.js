const test    = require('tape');
const { result } = require('../../src/helpers');
const { wrap }   = require('../../src/type');

// describe('cons', () => {
// it('should create a singleton list from atoms');

// describe('concat', () => {
// it('should only work on lists');
// TODO use Rambda append/concat instead of Array.prototype.concat

// describe('replicate', () => {
test('should return an empty list on 0', (assert) => {
  assert.deepEqual(
    result(1, 0, 'replicate', ':'),
    wrap([])
  );
  assert.deepEqual(
    result(true, 3, 'replicate', ':'),
    wrap([true, true, true])
  );
  assert.end();
});
// it('should return null unless the second argument is a non-negative integer');

// describe('zip', () => {
test('should work on two empty lists', (assert) => {
  // zip is interesting, because it does not parse out the tokens
  // so it will either need to do parse out (recursively) itself,
  // *or* it will need to ...
  // 
  assert.deepEqual(
    result([], [], 'zip', ':'),
    wrap([])
  );
  assert.deepEqual(
    result(['a', 'b'], [1, 2, 3], 'zip', ':'),
    wrap([['a', 1], ['b', 2]])
  );
  assert.end();
});

//describe('length', () => {
test('should return 0 from an empty list', (assert) => {
  assert.deepEqual(
    result([], 'length', ':'),
    wrap(0)
  );
  assert.deepEqual(
    result([1, 'x', true, []], 'length', ':'),
    wrap(4)
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
