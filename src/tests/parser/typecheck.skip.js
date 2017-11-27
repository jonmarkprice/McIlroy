// @flow
import type { TokenizerConfig, Literal, Token } from '../../common/lang/parse';

const test = require('tape')
// const { tokenize } = require('../../common/lang/parse');
const { Right, Left } = require('../../common/lang/lib/either');
const { interpretTypes } = require('../../common/lang/typecheck');

test('interpretTypes', (assert) => {

  // Annotation and potential value for succ function on 3
  assert.deepEqual(
    interpretTypes(
      [
        {token: 'Value', type: {name: 'Number'}, value: 3}
      ],
      {in: [{name: 'Number'}], out: {name: 'Number'}},
      4
    ),
    Right.of({name: 'Number'})
  );

  // Now try a function
  assert.deepEqual(
    interpretTypes(
      [
        {token: 'Value', type: {name: 'Number'}, value: 1},
        {token: 'Value', type: {name: 'Function'}} // no value
      ],
      {
        in: [{name: 'Number'}, {name: 'Function'}],
        out: {name: 'Function'}
      },
      () => 2, // bogus function, shouldn't matter
    ),
    Right.of({name: 'Function'})
  );  

  assert.end();
});
