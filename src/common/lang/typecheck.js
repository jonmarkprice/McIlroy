// @flow
const { Left, Right } = require('./lib/either');
const R = require('ramda');
const {
    findIndex, nth, propEq
} = require('ramda');

import type { Either } from './lib/either';

type TypeName = 'Char' | 'Number' | 'Boolean';
export type TokenType = 'Primitive' | 'Alias' | 'Boolean' | 'Number' | 'Char'; 
export type Type = {type: TypeName}
            | {type: 'List', of: Type} 
            | {type: 'Any', id: number}
            | {type: 'Function', from: Type, to: Type};

// findIndex, propEq, nth
function interpretTypes (
    actual : TokenType[], 
    annotation : {in: Type[], out: Type}
) : Either<string> 
{
    if (annotation.out.type === 'Any') {
        const index = findIndex(propEq('id', annotation.out.id), annotation.in);
        if (index === undefined) {
            return Left.of("Can't match Any type");
        }
        else {
            return Right.of(R.nth(index, actual));
        }
    }
    else return Right.of(annotation.out.type);
}

type TypeCheck = {ok: boolean, msg: string};
const primitives = new Set([
    'Boolean', 'Char', 'Number' 
 ]);

function checkTypePairs(acc : TypeCheck, current : [Type, string]) : TypeCheck {
    if (! acc.ok) return acc;

    const [annotation, actual] = current;

    // TODO: I need to check DEF first because
    // if DEF is a primitive we are done.
    // Whereas if DEF is any, ACTUAL doesn't tell as anything
    if (primitives.has(annotation.type)) {
        if (annotation === actual) return {ok: true, msg: ''};
        else return {
            ok: false,
            msg: `Types ${actual} and ${annotation.type} do not match.`
        };
    }
    else if (annotation.type === 'Any') {
        // TODO: Should I differentiate between list of any and any?
        // or function of any? Do I want seperate any value and
        // any anything annotatons?
        return {ok: true, msg: ''};
    }
    else if (annotation.type === 'List') { // List, Function
        // NOTE: Format for lists is {type: 'List', of: T}
        // XXX : This is a problem...
        // I guess we will need the whole argument list, not just the types...
        return {ok: false, msg: '[ NOT IMPLEMENTED ]'};
    }
    else if (annotation.type === 'Function') {
        // TODO
        return {ok: false, msg: '[ NOT IMPLEMENTED ]'};
    }
    else {
        return {
            ok: false,
            msg: 'Unknown type'
        };
    }
}

function checkTypes (
    actual : TokenType[],
    annotation : {in: Type[], out: Type}
) : TypeCheck { // or Maybe<Error> or Either<null>
    // TODO compare args.right().map(prop('type'))
    // to Right.of(def.types.out)
    if (annotation.in.length !== actual.length) {
        return {
            ok: false,
            msg: 'Wrong arity'
        };
    }
    // Could zip...
    const pairs = R.zip(annotation.in, actual);

    pairs.reduce(checkTypePairs, {ok: true, msg: ''});

    //return R.equals(actual, R.map(R.prop('type', annotation.in)));

    // This is not quite right.
    // we need to allow for 
    // 1. Lists
    // 2. Functions
    // 3. Any
}

module.exports = { interpretTypes };