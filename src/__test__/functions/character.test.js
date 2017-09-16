import { run } from '../helpers';

describe('uppercase', () => {
  it('should transform a lowercase character to uppercase', () => {
    expect(run('a', 'uppercase', ':')).toBe('A');
  });
  it('should return an already uppercase character as is');
  it('should return a non-alphabetic character as is');
});

describe('lowercase', () => {
  it('should transform a lowercase character to lowercase');
  it('should return an already lowercase character as is');
  it('should return a non-alphabetic character as is');
})
