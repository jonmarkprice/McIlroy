import parse from '../lib/parser';

const run = (...program) => {
  const stack = parse(program).stack;
  if (stack.length === 1) {
    // The only item on the stack.
    return stack[0];
  }
  else {
    return null;
  }
}

describe('plus', () => {
  it('should run 1 + 1', () => {
    expect(run(1, 1, '+', ':')).toBe(2);
  });
});

describe('eval', () => {
  it('should evaluate to a single argument', () => {
    expect(run([0, 'id'], 'eval', ':')).toBe(0);
  });
});

describe('apply', () => {
  it('should apply a function in the second argument to the list of arguments',
     () => {
       expect(run([0], 'id', 'apply', ':')).toBe(0);
       expect(run([1, 5], '+', 'apply', ':')).toBe(1 + 5);
     }
  );
});

describe('partial', () => {
  it('should be able to consume 1 argument', () => {
    expect(run([3, 18, 0], 1, '+', 'partial', ':', 'map', ':')).toEqual([4, 19, 1]);
  });
  it('should work ...', () => {
    expect(run([3, 12, 0], 2, '^', 'partial', ':', 'map', ':')).toEqual([8, 4096, 1]);
  });
  it('should work with flip', () => {
    expect(run([3, 12, 0], 2, '^', 'flip', ':', 'partial', ':', 'map', ':')).toEqual(
      [9, 144, 0]);
  });
});

describe('flip', () => {
  it('should flip the arguments of a arity-2 function', () => {
    expect(run(3, 7, '-', 'flip', ':', ':')).toBe(7 - 3);
    expect(run(5, 3, '-', 'flip', ':', ':')).toBe(3 - 5);
  });
});

// TODO: try flip, partial

/* List of functions:
'+', '-', '*', '/', '^', '%', 'apply',
'and', 'capitalize', 'concat', 'cond', 'cons',
'equals', 'id', 'length', 'map', 'not', 'or',
'reduce', 'split', 'succ' */
