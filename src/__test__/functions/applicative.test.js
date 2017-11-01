import { run } from '../helpers';

// Any function that applies a function it takes as an argument

describe('apply', () => {
  it('should apply a function in the second argument to the list of arguments',
     () => {
       expect(run([0], 'id', 'apply', ':')).toBe(0);
       expect(run([1, 5], '+', 'apply', ':')).toBe(1 + 5);
     }
  );
});

describe('eval', () => {
  it('should evaluate to a single argument', () => {
    expect(run([0, 'id'], 'eval', ':')).toBe(0);
  });
});

describe('map', () => {
  it('should do nothing to an empty list', () => {
    expect(run([], 'id', 'map', ':')).toEqual([]);
  });
  it('should map a unary function over a small list');
});

describe('reduce', () => {
  it('should return its third argument if given an empty list.', () => {
    expect(run([], 'id', 0, 'reduce', ':')).toBe(0);
    expect(run([], 'id', true, 'reduce', ':')).toBe(true);
    expect(run([], 'id', [], 'reduce', ':')).toEqual([]);
    expect(run([], 'id', 'a', 'reduce', ':')).toBe('a');
  });
});

describe('into', () => {
  it('should capitalize the first letter only', () => {
    expect(run(['h', 'i'], '[', 'uppercase', 'id', ']', 'into', ':'))
    .toEqual(['H', 'i']);
  })
})

// describe('filter'); // Can be implement with reduce
