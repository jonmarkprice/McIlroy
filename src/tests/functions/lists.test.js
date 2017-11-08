const test    = require('tape');
const { run } = require('../helpers');

// describe('cons', () => {
// it('should create a singleton list from atoms');

// describe('concat', () => {
// it('should only work on lists');
// TODO use Rambda append/concat instead of Array.prototype.concat

// describe('replicate', () => {
test('should return an empty list on 0', (assert) => {
  assert.deepEqual(run(1, 0, 'replicate', ':'), []);
  assert.end();
});
// it('should return null unless the second argument is a non-negative integer');

// describe('zip', () => {
test('should work on two empty lists', (assert) => {
  assert.deepEqual(run([], [], 'zip', ':'), []);
  assert.end();
});

//describe('length', () => {
test('should return 0 from an empty list', (assert) => {
  assert.equal(run([], 'length', ':'), 0);
  assert.end();
});

// describe('split', () => {
// it('should return null for an empty list');
