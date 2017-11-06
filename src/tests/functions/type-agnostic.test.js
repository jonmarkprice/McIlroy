import { run } from '../helpers';

describe('equal', () => {
  it('should compare numbers', () => {
    expect(run(0, 0, '=', ':')).toBe(true);
  });
});

describe('id', () => {
  it('should work for integers');
})
