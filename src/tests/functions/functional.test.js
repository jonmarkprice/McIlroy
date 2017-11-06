import { run } from '../helpers';

// Take a function, return a function

describe('curry', () => {
  it('should be able to consume 1 argument', () => {
    expect(run([3, 18, 0], 1, '+', 'curry', ':', 'map', ':'))
      .toEqual([4, 19, 1]);
  });
  it('should work with flip', () => {
    expect(run([3, 12, 0], 2, '^', 'flip', ':', 'curry', ':', 'map', ':'))
      .toEqual([9, 144, 0]);
  });
  it('should be chainable', () => {
    expect(run(3, 4, '+', 'curry', ':', 'curry', ':', ':')).toBe(7);
  });
});

describe('flip', () => {
  it('should flip the arguments of a arity-2 function', () => {
    expect(run(3, 7, '-', 'flip', ':', ':')).toBe(7 - 3);
    expect(run(5, 3, '-', 'flip', ':', ':')).toBe(3 - 5);
    expect(run('A', [], 'cons', 'flip', ':', ':')).toEqual(['A']);
  });
});

describe('compose', () => {
  it('should be able to compose a curried function', () => {
    expect(run('a', 'uppercase', [], 'cons', 'curry', ':', 'compose', ':', ':'))
      .toEqual(['A']);
  });
  it('should work for two unary functions', () => {
    expect(run([], 'length', 'succ', 'compose', ':', ':')).toBe(1);
  });
  it('should be mappable', () => {
    expect(run([[], [1], [1, 2]], 'length', 'succ', 'compose', ':', 'map', ':'))
      .toEqual([1, 2, 3]);
  });
});