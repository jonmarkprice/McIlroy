const test    = require('tape');
const { run } = require('../helpers');

// describe('curry', () => {
test('should be able to consume 1 argument', (assert) => {
  assert.deepEqual(run([3, 18, 0], 1, '+', 'curry', ':', 'map', ':'),
    [4, 19, 1]);
  assert.end();
});
test('should work with flip', (assert) => {
  assert.deepEqual(run([3, 12, 0], 2, '^', 'flip', ':', 'curry', ':', 'map', ':'),
    [9, 144, 0]);
  assert.end();
});
test('should be chainable', (assert) => {
  assert.equal(run(3, 4, '+', 'curry', ':', 'curry', ':', ':'), 7);
  assert.end();
});

// describe('flip', () => {
test('should flip the arguments of a arity-2 function', (assert) => {
  assert.equal(run(3, 7, '-', 'flip', ':', ':'), 7 - 3);
  assert.equal(run(5, 3, '-', 'flip', ':', ':'), 3 - 5);
  assert.deepEqual(run('A', [], 'cons', 'flip', ':', ':'), ['A']);
  assert.end();
});


// describe('compose', () => {
test('should be able to compose a curried function', (assert) => {
  assert.deepEqual(run('a', 'uppercase', [], 'cons', 'curry', ':', 'compose', ':', ':'),
    ['A']);
  assert.end();
});
test('Compse should work for two unary functions', (assert) => {
  assert.equal(run([], 'length', 'succ', 'compose', ':', ':'), 1);
  assert.end();
});
test('should be mappable', (assert) => {
  assert.deepEqual(run([[], [1], [1, 2]], 'length', 'succ', 'compose', ':', 'map', ':'),
    [1, 2, 3]);
  assert.end();
});
