const test = require('tape');
const S = require('sanctuary');
const { tokenize, runPrimitive } = require('../../common/lang/parse');
const functions = require('../../common/lang/functions'); //XXX ?
const syntax  = require('../../common/lang/syntax');
const library = require('../../common/lang/library');

const { Right, Left } = S;
const tokenize_ = x => tokenize(x, {primitives: functions, syntax});

test('parseFunction', (assert) => {
  const plus = Right({
    value: library.get('+')
  });

  const acc = {
    stack: Right([1, 2].map(tokenize_)),
    steps: [],  // don't care
    index: 3,   // don't care
    first: true // don't care
  };

  assert.deepEqual(
    runPrimitive(plus, acc),
    {
      stack: Right([tokenize(3)]),
      steps: [],  // don't care
      index: 3,   // ''
      first: true // '' 
    }
  );

  assert.end();
});
