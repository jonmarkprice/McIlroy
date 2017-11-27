// @flow
import type { TokenizerConfig, Literal, Token } from '../common/lang/parse';

const test = require('tape')
const library = require('../../common/lang/library');
const { tokenize_ } = require('../../common/lang/tokenize');

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

