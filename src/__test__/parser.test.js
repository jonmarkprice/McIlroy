import parse from '../lib/parser';

const run = (input, program) => {
  const joined = (input === null) ? program : [input].concat(program);
  return parse(joined).stack.slice(-1)[0];
}

describe('plus', () => {
  it('should run 1 + 1', () => {
    expect(run(null, [1, 1, '+', ':'])).toBe(2);
  });
});

describe('eval', () => {
  it('should evaluate to a single argument', () => {
    expect(run([0, 'id'], ['eval', ':'])).toBe(0);
  });
});

describe('apply', () => {
  it('should apply a function in the second argument to the list of arguments',
     () => {
       expect(run([0], ['id', 'apply', ':'])).toBe(0);
     }
  );
});

/* List of functions:
'+', '-', '*', '/', '^', '%', 'apply',
'and', 'capitalize', 'concat', 'cond', 'cons',
'equals', 'id', 'length', 'map', 'not', 'or',
'reduce', 'split', 'succ' */
