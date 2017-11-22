const test = require('tape');
const { result } = require('../../common/lang/helpers');
const { wrap } = require('../../common/lang/type');

test('Uppercase', (assert) => {
  assert.deepEqual(
    result('a', 'uppercase', ':'), 
    wrap('A'),
    'should transform a lowercase character to uppercase'
  );
  assert.end();
});
// it('should return an already uppercase character as is');
// it('should return a non-alphabetic character as is');

// describe('lowercase', () => {
// it('should transform a lowercase character to lowercase');
// it('should return an already lowercase character as is');
// it('should return a non-alphabetic character as is');

