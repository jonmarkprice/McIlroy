const test = require('tape');
const { Right, Left } = require('sanctuary');
const { parseFunction } = require('../../src/common/parser/parse');
const { tokenize_ } = require('../../src/common/parser/tokenize');

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
      steps: [{snapshot: ["3"], consumed: 4}], 
      index: 4,
      first: true
    }
  );

  assert.end();
});
