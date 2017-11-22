// @flow
// The new parser, called just "parse"
const R = require('ramda');
const {
  __,
  append,     // a b
  assoc,
  curry,      // c
  compose,
  drop,       // d
  // dropLast,
  equals,     // e
  findIndex,  // f g
  has,        // h 
  head,       // 
  inc,        // i j k
  // last,     
  lensProp,   // l m 
  nth,        // n 
  over,       // o
  pipe,
  prop,       // p q r
  set,        // s t u
  view        // v w x y z
} = R; // from ramda
const S = require('sanctuary');
const { Left, Right } = S;
const { last, dropLast, takeLast, gets } = require('./lib/sanctuary-either');
const { wrap, unwrap } = require('./type');
const display = require('./display'); 

import type { Type, TokenType } from './typecheck';
// import type { Either } from './lib/either';

// const { Left, Right } = require('./lib/either');
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
// NOTE:
// Looking at parse, it seems the old parser had a very different accumulator,
// or else parse() is based on incorrect assumptions (maybe explaining why
// it doesn't seem to work very well).
// Essentially the structure seems to be: 
/* 
{
  steps: [
    {
      index : number,
      stack : [...tokens] // snapshot 
    }
    ...
  ]
}

*/


function createSteps(tokens : Token[]) // <-- take here and tokenize
{ // previously parse
  // TODO
  
  //throw Error('[INTERNAL] createSteps not implemented.');
  /*
  let steps = [];  

  // Call parseStack to do the actual work
  const output : Accumulator = parseStack(tokens, [], true, 0);
  
  // XXX: need to map since ouput is an Either
  // const leftover = output.stack.slice(-1) // saves last item of stack

  // Iterates through output.steps and appends to steps, at each "point"
  // 1. a copy of the stack
  // 2. the program up until the index
  for (let {stack, index} of output.steps) {
    // already have steps...
    steps.push([...stack, ...program.slice(index)]);
  }
  return {stack: leftover, steps}; 
  */
}

// previously parseProgram
// call with ([...Token], [], true, 0)
function parseStack(
  input : Token[],
  stack : Either<Token[]>,
  first : boolean,
  index : number ) : Accumulator
{
  const init : Accumulator = {
    stack, // S.Right([...tokens])
    steps: [],
    /* steps will be a list of:
    {
      snapshot: [], // of strings
      consumed: 0   // number of input tokens consumed
    }
    */
    first,
    index
  };

  //Right.of({stack, first, index});
  return input.reduce(parseToken, init);
}

//////////////////
const stackLens = R.lensProp('stack');
const indexLens = R.lensProp('index');

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
  current : Token // This comes from input
) : Accumulator
{
  if (current.token === 'Syntax') {
    switch (current.value) {
      case ':': return parseFunction(acc);
        // XXX This should check the type (Prim., Alias)
      case '[': return pushToStack(current, acc);
      case ']': return buildList(acc);
      default :
        return set(stackLens, Left(`Unknown syntax ${current.value}`), acc);
    }
  }
  else return pushToStack(current, acc);
}

function pushToStack(token : Token, acc : Accumulator) : Accumulator {
  return S.pipe([
      over(stackLens, S.map(append(token))),
      over(indexLens, inc)
    ], acc);
}

function buildList(acc : Accumulator) : Accumulator {
  return set(stackLens, Left('buildList not implemented.'), acc);
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
  // const fn : Either<Token>  = acc.map(compose(last, prop('stack')));
  //const fn : Accumulator = over(stackLens, S.map(last), acc);
  // console.log('-- acc.stack -----');
  // console.log(acc.stack);

  const fn : Either<Token> = S.chain(last, acc.stack);
  const fnTok  = S.pluck('token', fn);
  const fnType = S.chain(gets(S.is(String), ['type', 'name']), fn);

  // Update the acc. to drop the last item (e.g. fn) from stack.
  const updated = over(stackLens, S.chain(dropLast(1)), acc);

  if (S.equals(Right('Alias'), fnTok)) {
    return expandAlias(fn, updated); // was fn.right()
  }
  else if (equals(Right('Value'), fnTok) && equals(Right('Function'), fnType)) {
    // return runPrimitive(fn, updated); // was fn.right()
    // NOTE: we know that runPrimitive will return either a Left, or a Right(Token)
    // it will not recur/expand. Thus, we need only pass the stack, and not the rest
    // of the accumulator.
    // return over(stackLens, S.chain(S.append(result)), updated);
    // XXX: runPrimitive will need to add its own steps
    return runPrimitive(fn, updated);

    return set(stackLens, newStack, updated);
  }
  else {
    // Unreachable - by design
    // DEBUGGING:
    console.log('-'.repeat(30));
    console.log(fn);
    console.log('FnType: ');
    console.log(fnType);

    console.log('FnTok: ');
    console.log(fnTok);
    // console.log(JSON.stringify(updated, null, 3));
    console.log(JSON.stringify(acc, null, 3)); 
    console.log('-'.repeat(30));

    // XXX This would overwrite any previous errors
    return set(stackLens, Left('Invalid function type'), acc);
  }
}

// use in expandAlias and runPrimitive
function expandAlias(alias : Token, acc : Accumulator) : Accumulator {
  // return Left.of('[INTERNAL] expandAlias not implemented.');
  return set(stackLens, Left('[DEV] expandAlias not implemented'), acc);
}

// used in runPrimitive, but loosely coupled
const print = R.compose(display, unwrap);
const stepLens = R.lensProp('steps');

/**
 * Calls the function [definition] on a portion of the stack.
 */
// NOTE: While I could, in theory pass only the stack, we would still need to return
// a whole stack because we have not yet decoded the arity, so we would not know how
// many to pop off, and since we will have all the needed information HERE, it makes
// sense to manage adding the step under this function as well.

// function runPrimitive(fn : Either<Token>,  stack: Either<Token[]>) : Either<Token> {
function runPrimitive(fn : Either<Token>, acc : Accumulator) : Accumulator {
  const def   : Either<LibDef> = S.pluck('value', fn);
  const arity : Either<number> = S.pluck('arity', def);
  const args    = S.join(S.lift2(takeLast, arity, acc.stack));
  const result  = applyDef(def, args);

  const updateStack = S.pipe([
    x => S.join(S.lift2(dropLast, arity, x)), // drop the last N stack
    S.lift2(S.append, result)                 // append result
  ]);
  const updated = over(stackLens, updateStack, acc);
  return addSteps(arity, updated);
}

/**
 * Add steps to the accumulator object.
 * @param {Either<number>} arity
 * @param {Accumulator} acc
 * @return {Accumulator}
 */
function addSteps(arity, acc) {
  const snapshot = S.map(S.map(print), acc.stack);
  const consumed = S.map(S.add(acc.index), arity);
  const step = S.pipe([
    S.lift2(R.assoc('snapshot'), snapshot),
    S.lift2(R.assoc('consumed'), consumed)
  ], Right({}));
  const steps = S.either(R.always([]), R.of, step);

  return over(stepLens, S.concat(__, steps), acc); 
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

function applyDef(def : Either<LibDef>, tokenList : Either<Token[]>) : Either<Token> { 
  const annotation  = S.pluck('types', def);
  const fn          = S.pluck('fn'   , def);
  
  // tokenList has the form Either([Token...])
  const raw = R.map(R.map(unwrap), tokenList);
  const result = R.ap(R.map(R.apply, fn), raw);

  // TODO: have a test of functions? for wrap -- no.
  // TODO: will soon want fn to return a Maybe result, thus will need to chain/join.
  // TODO: consider trying a functional function with in applyDef test.

  const wrapped = R.chain(wrap, result);
  return wrapped;
}

module.exports = {
  tokenize // TODO: move
  , extractValue
  , createSteps
  , parseStack
  , parseFunction
  , runPrimitive
  , applyDef
}
