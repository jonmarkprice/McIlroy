const test = require('tape');
const S = require('sanctuary');
const { applyDef } = require('../../common/lang/parse');
// const functions = require('../../common/lang/functions');
// const syntax  = require('../../common/lang/syntax');

const { Right, Left } = S;
// const tokenize_ = x => tokenize(x, {primitives: functions, syntax});

test('applyDef', (assert) => {
  assert.deepEqual(
    applyDef(
      Right({
        types: {in: [{name: 'Number'}, {name: 'Number'}], out: {name: 'Number'}},
        fn: x => y => x + y
      }),
      Right([
        {value: 1, type: {name: 'Number'}},
        {value: 2, type: {name: 'Number'}}
      ])
    ),
    Right({value: 3, token: 'Value', type: {name: 'Number'}})
  );

  assert.end()
});

