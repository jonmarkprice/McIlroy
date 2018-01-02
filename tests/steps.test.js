const test = require('tape');
const { parseProgram } = require('../src/common/parser/program.js');
const { tokenize_ } = require('../src/common/parser/tokenize');

test('one step', (assert) => {
  assert.deepEqual(
    parseProgram([1, 2, '+', ':']).steps,
    [
      ["1", "2", "+", ":"], // or similar
      ["3"]
    ]
  );

  assert.end();
});

