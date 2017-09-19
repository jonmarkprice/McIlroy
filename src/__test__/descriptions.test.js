import descriptions from '../lib/descriptions';
import { run } from './helpers';

describe('descriptions', () => {
  it('should have an in and expect field for each example', () => {
    for (desc in descriptions) {
      if (desc.hasOwnProperty(example)) {
        expect(desc.hasOwnProperty('in')).toBe(true);
        expect(desc.hasOwnProperty('expect')).toBe(true);

        expect(run(desc.in)).toEqual(desc.expect);
      }
    }
  });

  it('should have the expected result for each example', () => {
    for (desc in descriptions) {
      if (desc.hasOwnProperty(example)) {
        expect(run(desc.in)).toEqual(desc.expect);
      }
    }
  });
});

// TODO: Make a similar test for library
