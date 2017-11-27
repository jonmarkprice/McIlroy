const test = require('tape');
const { run } = require('./helpers');
const { result } = require('../common/lang/helpers');
const { wrap } = require('../common/lang/type');


// This file is for larger tests that do not target a specific function but
// rather implement somewhat more interesting programs.
test('count the number of even numbers in a list', (assert) => {
  assert.deepEqual(
    result([3, 54, 8, 1], 2, '%', 'flip', ':', 'curry', ':', 'map', ':',
        0, '=', 'curry', ':', 'filter', ':', 'length', ':'),
    wrap(2)
  );
  assert.end();
});

// TODO: write a 'steps' function similar to result.

test('capitalizes a word', (assert) => {
  assert.deepEqual(
    result(['h', 'i'], 'split', ':', [], 'uppercase', [], 'cons', 'curry', 
    ':', 'compose', ':', 'cons', ':', 'id', 'cons', ':', 'zip', ':', 'eval',
    'map', ':', 'concat', 'apply', ':'),
    wrap(['H', 'i'])
  );
  assert.end();
});

// NOTE: This relies on, to-be-reimplemented list literals
test('capitalizes a word using list constructor', (assert) => {
  assert.deepEqual(run(['h', 'i'], 'split', ':', '[', 'uppercase', [], 'cons',
    'curry', ':', 'compose', ':', 'id', ']', 'zip', ':', 'eval', 'map', ':',
    'concat', 'apply', ':'), ['H', 'i']);
  assert.end();
});

// TODO: try all examples from src/parser.js
