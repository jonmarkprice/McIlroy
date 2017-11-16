// @flow
import type { TokenizerConfig, Literal, Token } from '../common/lang/parse';

const test = require('tape')
const library = require('../common/lang/library');
const { tokenize, parseStack } = require('../common/lang/parse');
const { Right, Left } = require('../common/lang/lib/either');

// TODO:
// try moving this somewhere ... getting name already bound...
// declare function test(name: string, cb: (...any) => any) : void;

// Bake-in the config. for more convient testing.
const config = {
    syntax: new Set([':', '[', ']']),
    primitives: new Set(['id', '+']) // expand as necessary
}
const tokenize_ = x => tokenize(x, config);

test('tokenize', (assert) => {
    assert.deepEqual(
        tokenize_(3),
        {token: 'Value', type: {name: 'Number'}, value: 3}
    );

    assert.deepEqual(
        tokenize_('id'),
        {token: 'Value', value: library.get('id'), type: {name: 'Function'}}
    );

    assert.deepEqual(
        [0, 'id', ':'].map(tokenize_),
        [
            {token: 'Value',  value: 0,    type: {name: 'Number'}},
            {token: 'Value',  value: library.get('id'), type: {name: 'Function'}},
            {token: 'Syntax', value: ':'}
        ]
    );

    assert.deepEqual(
        tokenize_([0, 'id', ':']),
        {token: 'Value', type: {name: 'List'}, value: [
            {token: 'Value',  value: 0,    type: {name: 'Number'}},
            {token: 'Value',  value: library.get('id'), type: {name: 'Function'}},
            {token: 'Syntax', value: ':'}
        ]}
    );

    assert.end();
});

test('parseStack', (assert) => {
    //const tokens : Token[] = ; // This was tested above.
    // What happens if we do nothing, just let the tokens pass through.
    assert.deepEqual(
        parseStack([0, 'id'].map(tokenize_), [], true, 0),
        Right.of({
            input: [], 
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
            input: [],
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
            input: [],
            stack: [{token: 'Value', type: {name: 'Number'}, value: 7}],
            index: 3,       // Don't care
            first: true     // Don't care
        })
    );
    //*/
    assert.end();
});
