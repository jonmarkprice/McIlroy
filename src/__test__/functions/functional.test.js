import { run } from '../helpers';

// Take a function, return a function

describe('partial', () => {
  it('should be able to consume 1 argument', () => {
    expect(run([3, 18, 0], 1, '+', 'partial', ':', 'map', ':'))
      .toEqual([4, 19, 1]);
  });
  it('should work with flip', () => {
    expect(run([3, 12, 0], 2, '^', 'flip', ':', 'partial', ':', 'map', ':'))
      .toEqual([9, 144, 0]);
  });
});

describe('flip', () => {
  it('should flip the arguments of a arity-2 function', () => {
    expect(run(3, 7, '-', 'flip', ':', ':')).toBe(7 - 3);
    expect(run(5, 3, '-', 'flip', ':', ':')).toBe(3 - 5);
  });
});
