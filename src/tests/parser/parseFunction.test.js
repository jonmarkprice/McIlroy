const test = require('tape');
const S = require('sanctuary');
const { tokenize, parseFunction } = require('../../common/lang/parse');
const functions = require('../../common/lang/functions'); //XXX ?
const syntax  = require('../../common/lang/syntax');

const { Right, Left } = S;
const tokenize_ = x => tokenize(x, {primitives: functions, syntax});

test('parseFunction', (assert) => {
  const acc = {
    stack: Right([1, 2, '+'].map(tokenize_)),
    steps: [],
    index: 3,
    first: true
  };

  assert.deepEqual(
    parseFunction(acc),
    {
      stack: Right([tokenize_(3)]),
      steps: [{snapshot: ["3"], consumed: 5}], 
      index: 3,
      first: true
    }
  );

  assert.end();
});
