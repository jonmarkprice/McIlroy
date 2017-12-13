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
const { last, dropLast, takeLast, gets } = require('./sanctuary-either');
const { wrap, unwrap } = require('./type');
const display = require('./display'); 

// const { interpretTypes } = require('./typecheck');
const library = require('./library');
const { tokenize_ } = require('./tokenize');


// type Accumulator = {
//  stack : Eiether<Token[]>,
//  steps : string[],
//  first : boolean,
//  index : number
// }; 

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

// Helper functions
const print = R.compose(display, unwrap);

// Lenses
const stepLens = R.lensProp('steps');
const stackLens = R.lensProp('stack');
const indexLens = R.lensProp('index');

// previously parseProgram
// call with ([...Token], [], true, 0)
function parseStack(input, acc) {
  // Steps will be a list of: { snapshot, consumed }
  // where
  //  - snapshot is a list of strings token display strings
  //  - consumed is the of input tokens consumed
  //
  // NOTE: object/rest spread works in node v9, but not babel-cli
  // {steps: [], ...acc}, once this is fixed use that.
  
  return input.reduce(parseToken, Object.assign({}, acc, {steps: []}));
}

// previously execToken
/** 
 * This should split on each token, making lists, executing functions,
 * or pushing to the stack.
 * @param {Accumulator} acc
 * @param {Token} current the current token
 * @returns {Accumulator} the updated accumulator from one of the "child" functions.
 */
function parseToken(acc, current) {
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

/**
 * @param {Token} token
 * @param {Accumulator} acc
 * @return {Accumulatoc}
 */
function pushToStack(token, acc) {
  return S.pipe([
      over(stackLens, S.map(append(token))),
      over(indexLens, inc)
    ], acc);
}

/**
 * @param {Accumulator} acc
 * @return {Accumulator}
 */
function buildList(acc) {
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
function parseFunction(acc) {
  // Pop the function (top/last of the stack).
  // const fn : Either<Token>  = acc.map(compose(last, prop('stack')));
  //const fn : Accumulator = over(stackLens, S.map(last), acc);

  const fn = S.chain(last, acc.stack); // Either<Token>
  const fnTok  = S.pluck('token', fn);
  const fnType = S.chain(gets(S.is(String), ['type', 'name']), fn);

  // Update the acc. to drop the last item (e.g. fn) from stack,
  // and update the index.
  const updated = S.pipe([
    over(stackLens, S.chain(dropLast(1))),
    over(indexLens, inc)
  ], acc);

  if (S.equals(Right('Alias'), fnTok)) {
    return expandAlias(fn, updated); // was fn.right()
  }
  else if (equals(Right('Value'), fnTok) && equals(Right('Function'), fnType)) {
    return runPrimitive(fn, updated);
  }
  else {
    // XXX This would overwrite any previous errors
    return set(stackLens, Left('Invalid function type'), acc);
  }
}

// use in expandAlias and runPrimitive
/**
 * @param alias {Either<Token>}
 * @param acc {Accumulator}
 * @return {Accumulator}
 */
function expandAlias(alias, acc) {
  // Extract the expansion from the alias, and append :
  // NOTE: Not typesafe, use R instead of S
  const expansionLens = R.lensPath(['value', 'expansion']);
  const expansion = R.pipe(
    R.map(view(expansionLens)), // extract expansion
    R.map(R.append(':')),       // add
    R.map(R.map(tokenize_))
  )(alias);
  
  // Create the expansion step
  const consumed = Right({consumed: acc.index});
  const expansionStep = S.pipe([
    S.lift2(S.concat, acc.stack),
    S.map(S.map(print)),
    S.lift2(R.assoc('snapshot'), __, consumed),
    S.either(R.always([]), R.of) // Convert Either to list
  ])(expansion);
  
  // Execute the alias
  // XXX: parseStack wants a 'normal' list of un-tokenized literals
  // TODO: consider rewriting so that a different function does the
  // tokenization...
  const newInput = S.either(R.always([]), S.I, expansion);
  const result = parseStack(newInput, {
    stack: acc.stack,
    index: 0,
    first: true // useless
  });

  const resultSteps = S.pipe([
    s => createSteps(newInput, s),
    R.map(x => ({consumed: acc.index, snapshot: x}))
  ])(result.steps);

  return {
    steps: R.flatten([acc.steps, expansionStep, resultSteps]),
    stack: result.stack,
    index: acc.index,
    first: true // useless
  }
}

function createSteps(tokens, steps) {
  const input = S.map(print, tokens);
  return steps.map(({snapshot, consumed}) => {
    const leftover = input.length - consumed;        
    return S.concat(snapshot, R.takeLast(leftover, input))
  }); 
}

/**
 * Calls the function [definition] on a portion of the stack.
 */
// NOTE: While I could, in theory pass only the stack, we would still need to return
// a whole stack because we have not yet decoded the arity, so we would not know how
// many to pop off, and since we will have all the needed information HERE, it makes
// sense to manage adding the step under this function as well.

// function runPrimitive(fn : Either<Token>,  stack: Either<Token[]>) : Either<Token> {
/**
 * _
 * @param fn {Either<Token>
 * @param acc {Accumulator}
 * @return {Accumulator}
 */
function runPrimitive(fn, acc) {
  const def   = S.pluck('value', fn);   // Either<LibDef>
  const arity = S.pluck('arity', def);  // Either<number>
  const args  = S.join(S.lift2(takeLast, arity, acc.stack));
  const result  = applyDef(def, args);

  const updateStack = S.pipe([
    x => S.join(S.lift2(dropLast, arity, x)), // drop the last N stack
    S.lift2(S.append, result)                 // append result
  ]);
  const updated = over(stackLens, updateStack, acc);
  return addSteps(updated);
}

/**
 * Add steps to the accumulator object.
 * @param {Either<number>} arity
 * @param {Accumulator} acc
 * @return {Accumulator}
 */
function addSteps(acc) {
  const consumed = Right({consumed: acc.index});
  const snapshot = S.map(S.map(print), acc.stack);
  const step = S.lift2(R.assoc('snapshot'), snapshot, consumed);
  const steps = S.either(R.always([]), R.of, step);

  return over(stepLens, S.concat(__, steps), acc); 
}

/*
type LibDef = {
display: string,
         arity: number,
  types: {
    in: Type[],
    out: Type
  },
  fn: (any) => any
} */

/**
 * @param {Either<LibDef>} def
 * @param {Either<Token[]>} tokenList
 * @return {Either<Token>}
 */
function applyDef(def, tokenList) { 
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
    parseStack
  , parseFunction
  , runPrimitive
  , applyDef
  , print
  , createSteps
}
