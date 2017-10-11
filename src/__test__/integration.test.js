import { run } from './helpers';
// This file is for larger tests that do not target a specific function but
// rather implement somewhat more interesting programs.
describe('integration tests', () => {
  it('count the number of even numbers in a list', () => {
    expect(
      run([3, 54, 8, 1], 2, '%', 'flip', ':', 'curry', ':', 'map', ':',
          0, '=', 'curry', ':', 'filter', ':', 'length', ':'))
      .toEqual(2);
  });

  it('capitalizes a word', () => {
    expect(run(['h', 'i'], 'split', ':', [], 'uppercase', [], 'cons', 'curry',
      ':', 'compose', ':', 'cons', ':', 'id', 'cons', ':', 'zip', ':', 'eval',
      'map', ':', 'concat', 'apply', ':'
    )).toEqual(['H', 'i']);
  });

  // TODO RE-INTRODUCE with the list constructor
  it('capitalizes a word using list constructor', () => {
    expect(run(['h', 'i'], 'split', ':', '[', 'uppercase', [], 'cons',
      'curry', ':', 'compose', ':', 'id', ']', 'zip', ':', 'eval', 'map', ':',
      'concat', 'apply', ':'
    )).toEqual(['H', 'i']);
  });
});
// TODO:
// try all examples from src/parser.js
