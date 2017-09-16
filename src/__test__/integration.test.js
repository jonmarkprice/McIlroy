import { run } from './helpers';
// This file is for larger tests that do not target a specific function but
// rather implement somewhat more interesting programs.

it('count the number of even numbers in a list', () => {
  expect(
    run([3, 54, 8, 1], 2, '%', 'flip', ':', 'partial', ':', 'map', ':',
        0, '=', 'partial', ':', 'filter', ':', 'length', ':'))
    .toEqual(2);
});

// TODO:
// try all examples from src/parser.js
