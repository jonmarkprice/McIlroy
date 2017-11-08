const test = require('tape');
const { run } = require('./helpers');

// This file is for larger tests that do not target a specific function but
// rather implement somewhat more interesting programs.
test('count the number of even numbers in a list', (assert) => {
  assert.equal(
    run([3, 54, 8, 1], 2, '%', 'flip', ':', 'curry', ':', 'map', ':',
        0, '=', 'curry', ':', 'filter', ':', 'length', ':'), 2);
  assert.end();
});

test('capitalizes a word', (assert) => {
  assert.deepEqual(run(['h', 'i'], 'split', ':', [], 'uppercase', [], 'cons',
    'curry', ':', 'compose', ':', 'cons', ':', 'id', 'cons', ':', 'zip', ':',
    'eval', 'map', ':', 'concat', 'apply', ':'), ['H', 'i']);
  assert.end();
});

test('capitalizes a word using list constructor', (assert) => {
  assert.deepEqual(run(['h', 'i'], 'split', ':', '[', 'uppercase', [], 'cons',
    'curry', ':', 'compose', ':', 'id', ']', 'zip', ':', 'eval', 'map', ':',
    'concat', 'apply', ':'), ['H', 'i']);
  assert.end();
});

// TODO: try all examples from src/parser.js
