const test = require('tape');
const { run } = require('./helpers');
const { result, stepList } = require('../common/lang/helpers');
const { wrap } = require('../common/lang/type');
const { tokenize_ } = require('../common/lang/tokenize');
const { parseStack } = require('../common/lang/parse');
const { Right, Left } = require('sanctuary');

// This file is for larger tests that do not target a specific function but
// rather implement somewhat more interesting programs.
test('count the number of even numbers in a list', (assert) => {
  const program = [
    [3, 54, 8, 1], 2, '%', 'flip', ':', 'curry', ':', 'map', ':', 0, '=',
    'curry', ':', 'filter', ':', 'length', ':'
  ];
 
  assert.deepEqual(result(...program), wrap(2), 'Check final result');

  const tokens = program.map(tokenize_);
  const acc = parseStack(tokens, Right([]), true, 0);
  assert.equal(acc.steps.length, 6);

  assert.deepEqual(acc.steps[0], {
   snapshot: ['[3, 54, 8, 1]', '2', '(%) flip'],
   consumed: 0 + 5 // consumed: [...], 2, %, flip, : (0 + 5 = 5)
  });
  
  assert.deepEqual(acc.steps[1], {
    snapshot: ['[3, 54, 8, 1]', '(2 (%) flip) curry'],
    consumed: 5 + 2 // consumed: curry, : (5 + 2 = 7)
  });

  assert.deepEqual(acc.steps[2], {
    snapshot: ['[1, 0, 0, 1]'],
    consumed:  7 + 2 // consumed: map, : (7 + 2 = 9)
  });

  assert.deepEqual(acc.steps[3], {
    snapshot: ['[1, 0, 0, 1]', '(0 =) curry'],
    consumed: 9 + 4 // consumed: 0, =, curry, : (9 + 4 = 13)
  });

  assert.deepEqual(acc.steps[4], {
    snapshot: ['[0, 0]'],
    consumed: 13 + 2 // consumed: filter, : (13 + 2 = 15)
  });

  assert.deepEqual(acc.steps[5], {
    snapshot: ['2'],
    consumed: 15 + 2 // consumed: length, : (15 + 2 = 17)
  });

  assert.equal(
    acc.steps[5].consumed,
    program.length,
    'We consumed all of the tokens'
  );

  assert.deepEqual(
    stepList(...program)[5],
    ['[0, 0]', 'length', ':'],
    'Check a sample of createSteps'
  );

  assert.end();
});

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
