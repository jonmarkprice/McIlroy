import { run } from '../helpers';

describe('not', () => {
  it('should implement the truth-table for NOT', () => {
    expect(run(false, 'not', ':')).toBe(true);
    expect(run(true, 'not', ':')).toBe(false);
  });
  it('should return null for non-logic input');
});

describe('and', () => {
  it('should implement the truth-table for AND', () => {
    expect(run(false, false, 'and', ':')).toBe(false);
    expect(run(false, true, 'and', ':')).toBe(false);
    expect(run(true, false, 'and', ':')).toBe(false);
    expect(run(true, true, 'and', ':')).toBe(true);
  });
  it('should return null for non-logic input');
});

describe('or', () => {
  it('should implement the truth-table for inclusive OR', () => {
    expect(run(false, false, 'or', ':')).toBe(false);
    expect(run(false, true, 'or', ':')).toBe(true);
    expect(run(true, false, 'or', ':')).toBe(true);
    expect(run(true, true, 'or', ':')).toBe(true);
  });
  it('should return null for non-logic input');
});

//describe('cond') // XXX currently deprecated
