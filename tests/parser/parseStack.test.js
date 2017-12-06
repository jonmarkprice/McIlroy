// import type { TokenizerConfig, Literal, Token } from '../../common/lang/parse';

const test = require('tape')
const S = require('sanctuary');
const library = require('../../src/library');
const { parseStack } = require('../../src/parse');
const { tokenize_ } = require('../../src/tokenize');
const { Right, Left } = S;
const { interpretTypes } = require('../../src/typecheck');

// TODO:
// try moving this somewhere ... getting name already bound...
// declare function test(name: string, cb: (...any) => any) : void;

const init = {
  stack: Right([]),
  first: true,
  index: 0
};

test('parseStack', (assert) => {
    //const tokens : Token[] = ; // This was tested above.
    // What happens if we do nothing, just let the tokens pass through.
    console.log(init);

    assert.deepEqual(
        parseStack([0, 'id'].map(tokenize_), init),
        {
          steps: [],
          stack: Right([0, 'id'].map(tokenize_)), 
          first: true, 
          index: 2
        },
        'Push to stack without executing.'
    );

    assert.deepEqual(
        parseStack([0, 'id', ':'].map(tokenize_), init),
        {
          steps: [{snapshot: ["0"], consumed: 3}],
          stack: Right([{token: 'Value', type: {name: 'Number'}, value: 0}]),
          index: 3,       // Don't care
          first: true     // Don't care
        },
        'Execute a basic function.'
    );

    console.log("================== ALIAS ==================");

    // Try an alias
    assert.deepEqual(
        parseStack(
          [1, 3, {name: 'plus', expansion: ['+']}, ':'].map(tokenize_),
         init
        ),
        {
          steps: [
            {consumed: 4, snapshot: ['1', '3', '+', ':']},
            {consumed: 4, snapshot: ['4']}
          ],
          stack: Right([{token: 'Value', type: {name: 'Number'}, value: 4}]),
          index: 4,
          first: true
        },
        'Execute an alias.'
    );
    //*/

  /* TODO
    // Try a harder function.. id doesn't really tell us much!!!
    assert.deepEqual(
        parseStack([3, 4, '+', ':'].map(tokenize_), init),
        Right.of({
            stack: [{token: 'Value', type: {name: 'Number'}, value: 7}],
            index: 3,       // Don't care
            first: true     // Don't care
        })
    );

    assert.deepEqual(
      parseStack([1, 2, 3, 4, 5, '+', ':'].map(tokenize_), init),
      Right.of({
        stack: [1, 2, 3, 9].map(tokenize), // 1, 2, 3 left alone
        index: 6,
        first: true
      })
    );
*/
    assert.end();
});

