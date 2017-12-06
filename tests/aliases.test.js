// Write unit tests for aliases, should get 'Not parsable'
//import { run } from './helpers';
//const { run } = require('./helpers');
const { result } = require('../src/helpers');
const { wrap } = require('../src/type');
const { parseStack } = require('../src/parse');
const { tokenize_ } = require('../src/tokenize');
const { parseProgram } = require('../src/program');
const { Right, Left } = require('sanctuary');
const test = require('tape');

// sum
//const sum = {type: 'alias', value: ['+', 0, 'reduce', ':']} // need display?
const sum = {name: 'sum', expansion: ['+', 0, 'reduce']}; // want :?
const plus = {name: 'plus', expansion: ['+']};

test('sums a list of numbers', (assert) => {
  // fails with 'not parsable'
  assert.deepEqual(result([1, 3, 4], sum, ':'), wrap(8));
  assert.end();
});

// TODO: try *just* +

// TODO: run could output steps... potentially. Maybe with a 'verbose' argument
// it seems that it is getting to exec somehow...

/*
  A strong motivation (in js and other interpreted languages) for good
  fuction names is a good stack trace.
  Currently I don't have a dedicated function expand aliases -- fix that.
*/

// Try an alias
test('test steps produced', assert => {
  assert.deepEqual(
    parseStack(
      [1, 3, plus, ':'].map(tokenize_),
      {stack: Right([]), index: 0, first: true}
    ),
    {
      steps: [
        {consumed: 4, snapshot: ['1', '3', '+', ':']},
        {consumed: 4, snapshot: ['4']}
      ],
      stack: Right([{token: 'Value', type: {name: 'Number'}, value: 4}]),
      index: 4,
      first: true
    },
    'Execute an alias.'
  );

  // Try an incomplete function
  assert.deepEqual(
    parseStack(
      [plus].map(tokenize_),
      {stack: Right([]), index: 0, first: true}
    ), {
      steps: [],
      stack: Right([{token: 'Alias', value: plus}]),
      index: 1,
      first: true
    },
    'Execute an alias.'
  );
  assert.end();
});

// XXX The problem appears to be parseProgram itself, since parseStack works.
// TODO Try the same tests with parseProgram
test('', assert => {
  assert.deepEqual(
    parseProgram([plus]).steps,
    [['plus']]
  );
  // other one...
  assert.end();
});
