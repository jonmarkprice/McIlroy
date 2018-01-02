const test = require('tape');
const S = require('sanctuary');
const { Right, Left } = S;
const { applyDef } = require('../../src/common/parser/parse');

test('applyDef', (assert) => {
  assert.deepEqual(
    applyDef(
      Right({
        arity: 2,
        types: {in: [{name: 'Number'}, {name: 'Number'}], out: {name: 'Number'}},
        fn: (x, y) => x + y
      }),
      Right([
        {value: 1, type: {name: 'Number'}},
        {value: 2, type: {name: 'Number'}}
      ])
    ),
    Right({value: 3, token: 'Value', type: {name: 'Number'}})
  );

  // functional - try map, apply, etc.
  /*
  assert.deepEqual(
    applyDef(Right({fn: R})
  );
  */

  assert.end()
});


