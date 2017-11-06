import { parseToken } from '../common/lib/parser';

it('should convert raw types into wrapped ones.', () => {
  expect(parseToken(true)).toEqual({'type': 'boolean', value: true});
});
