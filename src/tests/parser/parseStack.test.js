// @flow
import type { TokenizerConfig, Literal, Token } from '../../common/lang/parse';

const test = require('tape')
const library = require('../../common/lang/library');
const { tokenize, parseStack } = require('../../common/lang/parse');
const { Right, Left } = require('../../common/lang/lib/either');

const { interpretTypes } = require('../../common/lang/typecheck');

// TODO:
// try moving this somewhere ... getting name already bound...
// declare function test(name: string, cb: (...any) => any) : void;

// Bake-in the config. for more convient testing.
const config = {
    syntax: new Set([':', '[', ']']),
    primitives: new Set(['id', '+']) // expand as necessary
}
const tokenize_ = x => tokenize(x, config);

test('parseStack', (assert) => {
    //const tokens : Token[] = ; // This was tested above.
    // What happens if we do nothing, just let the tokens pass through.
    assert.deepEqual(
        parseStack([0, 'id'].map(tokenize_), [], true, 0),
        Right.of({
            stack: [0, 'id'].map(tokenize_), 
            first: true, 
            index: 2
        })
    );

    // Try a (known) function
    assert.deepEqual(
        parseStack([0, 'id', ':'].map(tokenize_), [], true, 0),
        //Left.of('[INTERNAL] runPrimitive not implemented.')
        Right.of({
            stack: [{token: 'Value', type: {name: 'Number'}, value: 0}],
            index: 2,       // Don't care
            first: true     // Don't care
        })
    );

    // Try an alias
    assert.deepEqual(
        parseStack([2, 2, {name: 'plus', expansion: '+'}, ':'].map(tokenize_), [], true, 0),
        Left.of('[INTERNAL] expandAlias not implemented.')
    );

    // Try a harder function.. id doesn't really tell us much!!!
    assert.deepEqual(
        parseStack([3, 4, '+', ':'].map(tokenize_), [], true, 0),
        Right.of({
            stack: [{token: 'Value', type: {name: 'Number'}, value: 7}],
            index: 3,       // Don't care
            first: true     // Don't care
        })
    );

    assert.deepEqual(
      parseStack([1, 2, 3, 4, 5, '+', ':'].map(tokenize_), [], true, 0),
      Right.of({
        stack: [1, 2, 3, 9].map(tokenize), // 1, 2, 3 left alone
        index: 6,
        first: true
      })
    );
    
    assert.end();
});

