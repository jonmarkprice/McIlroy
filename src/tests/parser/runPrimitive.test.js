const test = require('tape');
const S = require('sanctuary');
const {  runPrimitive } = require('../../common/lang/parse');
const library = require('../../common/lang/library');
const { Right, Left } = S;
const { tokenize_ } = require('../../common/lang/tokenize');

test('parseFunction', (assert) => {
  const plus = Right({
    value: library.get('+')
  });

  const acc = {
    stack: Right([1, 2].map(tokenize_)),
    steps: [],
    index: 2,   // don't care
    first: true // don't care
  };

  assert.deepEqual(
    runPrimitive(plus, acc),
    {
      stack: Right([tokenize_(3)]),
      steps: [{snapshot: ["3"], consumed: 2}],
      index: 2,   // ''
      first: true // '' 
    }
  );

  assert.end();
});
