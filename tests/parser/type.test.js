const test = require('tape');
const S = require('sanctuary');
const { Left, Right } = S;
const { infer, wrap, unwrap } = require('../../src/common/parser/type');

test('infer', assert => {
  assert.deepEqual(
    infer(3),
    Right({name: 'Number'}),
    'Simple numeric value.'
  );

  assert.deepEqual(
    infer([true, 3, 'x']),
    Right({name: 'List'}),
    'Shallow heterogenous list'
  );

  // TODO: proper function
  // TODO: bad function-like object
  // TODO: bogus type (string, regex, ...)
  // TODO: alias?

  assert.end();
});

test('wrap', assert => {
  assert.deepEqual(
    wrap(3),
    Right({value: 3, type: {name: 'Number'}, token: 'Value'}),
    'Number'
  );

  assert.deepEqual(
    wrap([true, 3, 'x']),
    Right({
      value: [
        {value: true, type: {name: 'Boolean'},   token: 'Value'},
        {value: 3,    type: {name: 'Number'},  token: 'Value'},
        {value: 'x',  type: {name: 'Char'},     token: 'Value'}
      ],
      type: {name: 'List'},
      token: 'Value'}),
    'Shallow heterogenous list.'
  );

  assert.deepEqual(
    wrap([[[], 0], 2]),
    Right({
      value: [
        {
          value: [
            {value: [], type: {name: 'List'}, token: 'Value'},
            {value: 0, type: {name: 'Number'}, token: 'Value'}
          ],
          type: {name: 'List'},
          token: 'Value'
        },
        {value: 2, type: {name: 'Number'}, token: 'Value'}
      ],
      type: {name: 'List'},
      token: 'Value'
    }),
    'Nested list'
  );

  assert.end();
});

test('unwrap', assert => {
  assert.deepEqual(
    unwrap({value: 2, type: {name: 'Number'}, token: 'Value'}),
    2,
    'Simple value'
  );

  assert.deepEqual(
    unwrap({
      value: [
        {value: true, type: {name: 'Boolean'},   token: 'Value'},
        {value: 3,    type: {name: 'Number'},  token: 'Value'},
        {value: 'x',  type: {name: 'Char'},     token: 'Value'}
      ],
      type: {name: 'List'},
      token: 'Value'
    }),
    [true, 3, 'x'],
    'Shallow heterogenous list.'
  );

  assert.deepEqual(
    unwrap({
      value: [
        {
          value: [
            {value: [], type: {name: 'List'}, token: 'Value'},
            {value: 0, type: {name: 'Number'}, token: 'Value'}
          ],
          type: {name: 'List'},
          token: 'Value'
        },
        {value: 2, type: {name: 'Number'}, token: 'Value'}
      ],
      type: {name: 'List'},
      token: 'Value'
    }),
    [[[], 0], 2],
    'Nested list'
  );

  assert.end();
});
