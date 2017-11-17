// @flow
const { Left, Right } = require('./lib/either');
const R = require('ramda');
const {
    findIndex, nth, propEq
} = require('ramda');

import type { Either } from './lib/either';
import type { Token }  from './parse';

type TypeName = 'Char' | 'Number' | 'Boolean' | 'Any' | 'List'
export type TokenType = 'Primitive' | 'Alias' | 'Boolean' | 'Number' | 'Char'; 
export type Type = {name: TypeName}
            | {name: 'Variable', id: number}
            | {name: 'Function', from: Type, to: Type};

// This is the helper function that lets us match Any types using the id
// XXX: actual could be a list type too! (or a function!)
/*
function matchAny(index : number, actual : TokenType)
: Either<string> { // or Either<Type>
    // const index = findIndex(propEq('id', id), LIST);
    if (index === undefined) {
        return Left.of(`Can't match Any type id ${id}.`);
    }
    else {
        return Right.of({
            name: R.nth(index, actual)
        });
    }
}*/

// findIndex, propEq, nth
function interpretTypes (
    // actual : TokenType[], 
    tokens : Token[],
    annotation : {in: Type[], out: Type},
    value : any,
) : Either<Type> 
{
    const actual : Type[] = R.map(R.prop('type'), tokens);
 
    if (annotation.out.name === 'Any') {
        return inferType(value);
    }
    else  if (annotation.out.name === 'Variable') {
        const index = findIndex(propEq('id', annotation.out.id), annotation.in);
        if (index === undefined) {
            return Left.of("Can't match variable type");
        }
        else {
            const resolved : Type = R.nth(index, actual);
            return Right.of(resolved);
        }
    }
    else if (annotation.out.name === 'Function') {
        return Right.of(annotation.out);
    }
    else if (annotation.out.name === 'Char'
        || annotation.out.name === 'Number' 
        || annotation.out.name === 'Boolean'
        || annotation.out.name === 'List')
    {
        return Right.of(annotation.out); // This won't work..
    }
    else return Left.of("Unmatched case.");
}

// TODO : try to use this is tokenizer to reduce duplicated effort.
// This should also be easier to test.
function inferType(value : any) : Either<string> { // maybe Literal
    // NOTE: This is simpler than tokenize() because it does not
    // need to look up a string to see if it a token. It also does
    // not need to deal with Aliases.
    const supported = new Set(['Array', 'Boolean', 'Number']);
    const inferred : string = R.type(value);
    if (supported.has(inferred)) {
        return Right.of(inferred);
    }
    else if (inferred === 'String' && value.length === 1) {
        return Right.of('Char');
    }
    else if (inferred === 'Object') {
        const allTrue = R.reduce(R.and, true);
        const propChecks = R.juxt([
            R.propIs('Function', 'fn'),
            R.propIs('Number', 'arity'),
            R.propIs('String', 'display')
        ]);
        if (allTrue(propChecks(value))) {
            return Right.of('Function');
        }
        else {
            return Left.of('Object is not a proper function.');
        }
    }
    else {
        return Left.of('Cannot infer type.');
    }
}

type TypeCheck = {ok: boolean, msg: string};
const primitives = new Set([
    'Boolean', 'Char', 'Number' 
 ]);

function checkTypePairs(acc : TypeCheck, current : [Type, string]) : TypeCheck {
    if (! acc.ok) return acc;

    const [annotation, actual] = current;

    // TODO: check for Variable types (with id)

    // TODO: I need to check DEF first because
    // if DEF is a primitive we are done.
    // Whereas if DEF is any, ACTUAL doesn't tell as anything
    if (primitives.has(annotation.name)) {
        if (annotation === actual) return {ok: true, msg: ''};
        else return {
            ok: false,
            msg: `Types ${actual} and ${annotation.name} do not match.`
        };
    }
    else if (annotation.name === 'Any') {
        // TODO: Should I differentiate between list of any and any?
        // or function of any? Do I want seperate any value and
        // any anything annotatons?
        return {ok: true, msg: ''};
    }
    else if (annotation.name === 'List') { // List, Function
        // NOTE: Format for lists is {type: 'List', of: T}
        // XXX : This is a problem...
        // I guess we will need the whole argument list, not just the types...
        return {ok: false, msg: '[ NOT IMPLEMENTED ]'};
    }
    else if (annotation.name === 'Function') {
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
    return pairs.reduce(checkTypePairs, {ok: true, msg: ''});

    //return R.equals(actual, R.map(R.prop('type', annotation.in)));

    // This is not quite right.
    // we need to allow for 
    // 1. Lists
    // 2. Functions
    // 3. Any
}

module.exports = { interpretTypes };
