import { equal } from '../lib/helpers';

describe('equal', () => {
  it('should equate empty lists', () => {
    expect(equal([], [])).toBe(true);
  });
});
