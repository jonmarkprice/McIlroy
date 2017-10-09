/* TODO: add once I support list lit. in new parser
import syntax from '../lib/syntax';
import { run } from './helpers';

describe('List construction', () => {
  it('should construct an empty list', () => {
    expect(run('[',']')).toEqual([]);
  });
  it('should should construct a short, simple list', () => {
    expect(run('[', 0, 1, 2, true, 'A', ']')).toEqual([0, 1, 2, true, 'A']);
  });
  it('should construct a nested list', () => {
    expect(run('[', 1, '[', 2, 3, '[', 4, ']', 5, ']', 6, ']'))
    .toEqual([1, [2, 3, [4], 5], 6]);
  });
});
*/
