// Write unit tests for aliases, should get 'Not parsable'
import { run } from './helpers';

// sum
const sum = {type: 'alias', value: ['+', 0, 'reduce', ':']} // need display?

describe('sum', () => {
  it('sums a list of numbers', () => {
    // fails with 'not parsable'
    expect(run([1, 3, 4], sum, ':')).toBe(8);
  })
})

// TODO: run could output steps... potentially. Maybe with a 'verbose' argument
// it seems that it is getting to exec somehow...

/*
  A strong motivation (in js and other interpreted languages) for good
  fuction names is a good stack trace.
  Currently I don't have a dedicated function expand aliases -- fix that.
*/
