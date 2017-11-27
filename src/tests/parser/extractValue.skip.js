const test = require('tape');
// const S = require('sanctuary');
const { extractValue } = require('../common/lang/parse');
const R = require('ramda');

test('extract', (assert) => {
  assert.deepEqual(
    extractValue({value: 3, token: 'Value', type: {name: 'Number'}}),
    3,
    'Extract value from single token'
  );

  // now list
  //
  assert.deepEqual(
    R.map(extractValue, [ 
      // Try 2 diff. types
      {value: 3, token: 'Value', type: {name: 'Number'}},
      {value: 'A', token: 'Value', type: {name: 'Char'}}
    ]),
    [3, 'A'],
    'Extract value from a heterogenous list of tokens.'
  );


  // now Either of List
  // XXX: This won't work because ... wait R.map uses fantasy-land
  /*
  assert.deepEqual(
    R.map(extractValue, [
      {value: 3, token: 'Value', type: {name: 'Number'}},
      {value: 'A', token: 'Value', type: {name: 'Char'}}
    ]),
    S.Right([3, 'A']),
    'Either of a list'
  );*/

  assert.end();
});


