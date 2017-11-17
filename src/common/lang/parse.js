// @flow
// The new parser, called just "parse"
const R = require('ramda');
const {
  append,     // a b
  assoc,
  curry,      // c
  compose,
  drop,       // d
  dropLast,
  equals,     // e
  findIndex,  // f g
  has,        // h 
  head,       // 
  inc,        // i j k
  last,     
  lensProp,   // l m 
  nth,        // n 
  over,       // o
  pipe,
  prop,       // p q r s t u
  view        // v w x y z
} = R; // from ramda

import type { Type, TokenType } from './typecheck';
import type { Either } from './lib/either';

const { Left, Right } = require('./lib/either');
const { interpretTypes } = require('./typecheck');
const library = require('./library');

const old = require('../lib/parser');
// parse,      // createSteps
// parseProgram,   // parseStack
// execToken,    // parseToken
// parseFunction,  // .
// parseToken,   // [DEL] partially replaced by tokenize
// expandAlias,  // .
// exec      // parsePrimitive
// };

//type Alias   = {type: string, expansion: Array<Literal | Alias>}; // recursive types ok?
export type AliasLiteral = {name: string, expansion: Token[]};
export type Literal = string | number | boolean;
export type Token = SyntaxToken | AliasToken | ValueToken;
export type SyntaxToken = {token: 'Syntax', value: string};
export type AliasToken = {token: 'Alias', value: AliasLiteral};
export type ValueToken = {token: 'Value', type: {name: 'Boolean'}, value: boolean} 
  | {token: 'Value', type: {name: 'Number'}, value: number}
  | {token: 'Value', type: {name: 'Char'}, value: string}
  | {token: 'Value', type: {name: 'List'}, value: Literal[]}
  | {token: 'Value', type: {name: 'Function'}, value: string};

// TODO: potentially make function / alias sub-types

export type TokenizerConfig = {
  syntax: Set<string>,
  primitives: Set<string>
};

// TODO: Need steps
type Accumulator = Either<{
  stack : Token[],
  first : boolean,
  index : number
}>;

// NOTE: This funtion is intended to be mapped over.
// Assume there can't be any lists, only cons or list literals '[', ']'
// TODO: consider wrapping this Token in an Either
function tokenize(value : Literal | AliasLiteral, config : TokenizerConfig) : Token
{
  if (value.name !== undefined && value.expansion !== undefined) {
    // Any object that has 'name' and 'expansion' fields is considered to
    // be an alias.
    return {token: 'Alias', value};
    //return {token: 'Value', type: {name: 'List'}, value: []}; // TEST
  }
  // Check strings
  else if (typeof value == 'string') {
    if (config.syntax.has(value)) {
      // We could also use a Map or Set to define syntax and use .has()
      return {token: 'Syntax', value};
    }
    else if (config.primitives.has(value)) {
      return {
        token: 'Value',
        type: {name: 'Function'/* Eventually support from, to fields */},
        value: library.get(value)
      };
    }
    else if (value.length === 1) {
      return {token: 'Value', type: {name: 'Char'}, value};
    }
    else {
      throw Error('Abritrary strings not supported.');
    }
  }
  else if (typeof value == 'boolean') {
    return {token: 'Value', type: {name: 'Boolean'}, value};
  }
  else if (typeof value == 'number') {
    return {token: 'Value', type: {name: 'Number'}, value};
  }
  else if (Array.isArray(value)) {
    return {
      token: 'Value',
      type: {name: 'List'},
      value: value.map(x => tokenize(x, config))
    };
  }
  else {
    // Throw an error if not. This should never ever happen.
    throw Error('Invalid token!');
  }
}

// Takes a token and (recursively) extracts the values from it.
function extractValue(tok : Token) : any /*or literal*/ {
  if (tok.token !== 'Value') {
  throw Error('Not a value token'); // Either?
  }
  else {
  switch (tok.type.name) { // potentially unsafe if type undef
    case 'List':
      return tok.value.map(extractValue);
    case 'Number':
    case 'Char':
    case 'Boolean':
    case 'Function':
      return tok.value;
    default:
      throw Error('Unknown token type');
  }
  }
}

///// Actual parser starts here
// TODO: start at the buttom, and test your way up.
function createSteps()
{ // previously parse
  // TODO
  throw Error('[INTERNAL] createSteps not implemented.');
}

// previously parseProgram
// call with ([...Token], [], true, 0)
function parseStack(
  input : Token[],
  stack : Token[],
  first : boolean,
  index : number ) : Accumulator
{
  const init : Accumulator = Right.of({stack, first, index});
  return input.reduce(parseToken, init);
}

// previously execToken
/** 
 * This should split on each token, making lists, executing functions,
 * or pushing to the stack.
 * @param {Accumulator} acc
 * @param {Token} current the current token
 * @returns {Accumulator} the updated accumulator from one of the "child" functions.
 */
function parseToken(
  acc   : Accumulator,
  current : Token
) : Accumulator
{
  if (current.token === 'Syntax') {
    switch (current.value) {
      case ':': return parseFunction(acc);
        // XXX This should check the type (Prim., Alias)
      case '[': return pushToStack(current, acc);
      case ']': return buildList(acc);
      default : return Left.of('Unknown syntax.');
    }
  }
  else return pushToStack(current, acc);
}

// TODO: consider creating a parseSyntax helper

const lenses = {
  stack: lensProp('stack'),
  index: lensProp('index')
  // first: lensProp('first'); // Not used
}

function pushToStack(token : Token, acc : Accumulator) : Accumulator {
  return acc.map(over(lenses.stack, append(token)))
            .map(over(lenses.index, inc));
}

function buildList(acc : Accumulator) : Accumulator {
  return Left.of('buildList not implemented.');
}

// This used to take 2 args, a fn and a stack
// I may refactor so that it just takes one since all it does call with
// R.last(acc.stack), R.dropLast(1, acc.stack) ... which we could do inside
// The other advantage of a single parameter is that we can check that the list is
// empty *before* we try to get / drop last.
// However, this might call for a name change... e.g. 'execute stack'
/// @brief try to excute the function on the stack.
// XXX: Looks like this will need to take the full accumulator anyway... I will need
//    to to pass back an index, first, etc.

// XXX: Doesn't seem to care about whether or not the type is Primitive or Alias
/**
 * Checks whether the top of te stack contains a function, and if it does
 * calls the appropriate function to run it.
 * @param {Accumulator} acc the accumulator which should contain a function at the top
 *    of the stack.
 * @returns {Accumulator} the updated accumulator.
 */
function parseFunction(acc : Accumulator) : Accumulator {
  // Pop the function (top/last of the stack).
  const fn : Either<Token>  = acc.map(compose(last, prop('stack')));
  // if undefined, mb. return different error
  const updated : Accumulator = acc.map(over(lenses.stack, dropLast(1)));
  const fnTok  = fn.map(prop('token'));
  const fnType = fn.map(prop('type'));
  if (equals(Right.of('Alias'), fnTok)) {
    return expandAlias(fn.right(), updated)
  }
  else if (equals(Right.of('Value'), fnTok) && equals(Right.of({name: 'Function'}), fnType)) {
    return runPrimitive(fn.right(), updated);
  }
  else {
    // XXX Unreachable - by design
    console.log('-'.repeat(30));
    console.log(fn);
    // console.log(JSON.stringify(updated, null, 3));
    console.log(JSON.stringify(acc, null, 3));
    
    console.log('-'.repeat(30));
    return Left.of('ERROR: Invalid function type.'); // XXX This would overwrite any previous erros
  }
}

// use in expandAlias and runPrimitive
function expandAlias(alias : Token, acc : Accumulator) : Accumulator {
  return Left.of('[INTERNAL] expandAlias not implemented.');

  //return Right.of(old.expandAlias())
}


/**
 * Calls the function [definition] on a portion of the stack.
 */
function runPrimitive(fn : FunctionToken, acc : Accumulator) : Accumulator {
  const lenses = {stack: lensProp('stack')}; // TODO: generalize

  // TODO: run all of these checks in the tokenization step.

  //if (library.has(fn.value)) {
    //const libdef = library.get(fn.value)
    //if (libdef === undefined) {
    //  return Left.of(`Error: ${fn.value} is not a function.`);
    //}
    //else {
      //if (has('fn', libdef)) {
        // const result = Right
        //.of(applyOverTokens)
        //.of(curry(applyOverTokens)(libdef.fn))
        //.ap(acc.map(prop('stack'))
          //.map(R.takeLast(libdef.arity)));

  const libdef = fn.value;   

  console.log("===========================");
  console.log('arity: ');
  console.log(libdef.arity);
  console.log(libdef);

  const args = acc.map(R.prop('stack'))
          .map(R.takeLast(libdef.arity));
  const result = applyDef(libdef, args);
  
  //const result = acc.map(prop('stack'))
    //.map(R.takeLast(libdef.arity))
    //.map(R.apply(libdef.fn));
    //.map(curry(applyOverTokens)(libdef.fn));
  // XXX const result = Right.of({type: 'Number', value: 0})
  // Ok, I see the problem we need to apply with the tokens...
  // Currently we are trying to do: 
  //  {type: '', value: 3} + {type: '', value: 4}
  // which of course is NaN!

  const rest = acc.map(R.over(lenses.stack, R.dropLast(libdef.arity)));
  return Right.of(x => R.over(lenses.stack, R.append(x)))
    .ap(result)
    .ap(rest);
      //}
      //else {
      //  return Left.of(`Error ${fn.value} has no implementation.`);
      //}
    //}
  //}
  //else {
  //  return Left.of(`Function ${fn.value} not found.`);
  //}
  
  // return Left.of('[INTERNAL] runPrimitive not implemented.');
}

type LibDef = {
  display: string,
  arity: number,
  types: {
    in: Type[],
    out: Type
  },
  fn: (any) => any
}

// sure... I just need to map over something that either returns
// a Left() or echos the input
// maybe just concat() instead of appending...
function applyDef(def : LibDef, args : Either<Token[]>) : Right<Token> | Left { 
  if (args.ok()) {

    const list = args.right();
    // XXX is this necessary?

    console.log('arg tokens');
    console.log(list);

    const raw : Literal[] = list.map(extractValue);

    console.log('raw args: ');
    console.log(raw);

    const value = def.fn(...raw);
    const token = Right.of({token: 'Value', value});
    return Right.of(x => y => R.assoc('type', x, y))
        .ap(interpretTypes(list, def.types, value))
        .ap(token);
  }
  else {
    return args; // pass error through
  }
}

module.exports = {
  tokenize
  , parseStack
};

