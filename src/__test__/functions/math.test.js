import { run } from '../helpers';

describe('plus', () => {
  it('should add small integers', () => {
    expect(run(1, 1, '+', ':')).toBe(2);
  });
});

describe('subtract', () => {
  it('should subtract two integers');
});

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
