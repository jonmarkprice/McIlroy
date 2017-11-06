import { run } from '../helpers';

describe('cons', () => {
  it('should create a singleton list from atoms');
});

describe('concat', () => {
  it('should only work on lists');
  // TODO use Rambda append/concat instead of Array.prototype.concat
});

describe('replicate', () => {
  it('should return an empty list on 0');
  it('should return null unless the second argument is a non-negative integer');
});

describe('zip', () => {
  it('should work on two empty lists', () => {
    expect(run([], [], 'zip', ':')).toEqual([]);
  });
});

describe('length', () => {
  it('should return 0 from an empty list', () => {
    expect(run([], 'length', ':')).toBe(0);
  });
});

describe('split', () => {
  it('should return null for an empty list');
});
