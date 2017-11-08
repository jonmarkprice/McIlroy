const test    = require('tape');
const { run } = require('../helpers');

// describe('uppercase', () => {
test('should transform a lowercase character to uppercase', (assert) => {
  assert.equal(run('a', 'uppercase', ':'), 'A');
  assert.end();
});
// it('should return an already uppercase character as is');
// it('should return a non-alphabetic character as is');

// describe('lowercase', () => {
// it('should transform a lowercase character to lowercase');
// it('should return an already lowercase character as is');
// it('should return a non-alphabetic character as is');

