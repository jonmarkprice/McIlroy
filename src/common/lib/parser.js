// GOAL: integrate with rest of program
// next:
// Get list construction working

// TODO: consider first parsing each token...

import * as R from 'ramda';
import library from './library';

//@flow
class Right {
  constructor(x) {
    this.value = x;
  }

  map(f) {
    // TODO: check the f is a function
    return new Right(f(this.value));
  }
}

class Left {
  constructor(x) {
    this.value = x;
  }

  map(f) {
    return this;
  }
}

type Agg = {
  stack : any[],
  steps : Step[],
  first : boolean,
  index : number 
}

//type Alias = {type: string, value: } // TODO
type Literal = string | bool | number | any[]; // | Alias;
//string | Array<any> | boolean | number | Alias
type Step = {
  stack: Literal[], // TODO
  index: number
} // TODO

type Stack = {stack: Literal[], index: number}

//type Token = //Left | Right;
class Token {
  constructor(value : Literal, type : string) {
    this.value = value;
    this.type  = type;
  }

  map(f) {
    this.value 
  }
}

// XXX: this is rather ugly. Especially since I already *have* all the data,
// it's just organized by step and is missing the "rest" part.
// Also, do I really need stack? Is it just used for the final result?
function parse(program : string[])  { // : Agg?
  let steps : Step[] = [];
  const output    = parseProgram(program, [], true, 0);
  const leftover  = output.stack.slice(-1);
  for (let {stack, index} of output.steps) {
    steps.push([...stack, ...program.slice(index)]);
  }
  return {stack: leftover, steps};
};

//
function parseProgram(list : string[], inStack : any[], first : boolean, index : number) : Agg {
  return list.reduce(execToken, {
    stack: inStack,
    steps: [],
    first: first,  // For tracking the index
    index: index // ''
  });
}

function parseToken(token : Literal) : Token {
  if (token === ':') {
    return new Token(':', 'syntax');
  }
  else if (library.has(token)) {
    return new Token(library.get(token), 'function');
  }
  // Process arrays
  else if (Array.isArray(token)) {
    return new Token(token.map(parseToken), 'list');
  }
  // Check for booleans
  else if (typeof token === 'boolean') {
    return new Token(Boolean(token), 'boolean');
  }
  // Check for number
  else if (typeof token === 'number') {
    return new Token(Number(token), 'number');
  }
  // Check for character (maybe later strings)
  else if (typeof token === 'string' && token.length === 1) {
    return new Token(token, 'char');
  }
  // TODO: add support for aliases
  else if (typeof token === 'object' && token.type === 'alias') {
    return new Token(token, 'alias');
  }
  // TODO: add support for special syntax ([, ])
  else {
    throw new Error(`Token ${JSON.stringify(token)} not parsable.`);
  }
}

// This function is called from reduce()
// We may have a problem here with steps... currently, no function can generate
// steps, execpt the top-most call of this, because it has array.
// This could be remedied if
// 1) we pass each function the *COMPLETE STACK*
// 2) we pass each function the *ABSOLUTE INDEX* into the program at a given
// time.
// The printing of steps is then done by whatever program surrounds the first
// call to parseProgram, e.g. parseProgram(progam, []).
// Each time a token is consumed, the index is incremented.
// We must be careful though, because we call parseProgram recursively. If we
// get the *ABSOLUTE INDEX* from the index argument, this will be overwritten
// by nested calls to parseProgram.
// Instead we must store it in the aggregate!
// Alternatively, we may be able to replace the agg.first entirely if we keep
// an absolute index and use the index from reduce to *offset* that index!

// execToken :: Agg -> String -> Either Agg String
// TODO: declare Agg
function execToken(agg : Agg, token : string) : Agg { // also  index, array
  let steps = [];
  let stack = [];

  // index management:
  const newIndex : number = (agg.first) ? agg.index + 1 : agg.index;

  if (token === ':') {
    const fn : (any => any) = R.last(agg.stack);  //agg.stack.slice(0, -1); // take last
    // XXX this could fail
    // Maybe function

    const rest = R.dropLast(1, agg.stack);


    [steps, stack] = parseFunction(fn, rest, newIndex); // will need a copy of stack
  }
  // if token === '['
  else if (token === ']') {
    // traverse bacwards until if find the latest '['
    // then split the stack and make the right half into a list.
    const stackSize : number = agg.stack.length;

    // Could use R.reduceRight
    let found = false;
    for (let i = stackSize; i >= 0; i -= 1) {
      if (agg.stack[i] === '[') {
        const [left, right] = R.splitAt(i, agg.stack);
        const contents = R.drop(1, right); // drop the literal '['.
        stack = [...left, contents];
        steps = [{stack, index: newIndex}] // prepend ...steps
        found = true;
        break;
      }
    }
    if (! found) {
      return new Left('No matching "[" found!');
    }
  }
  // TODO do whatever parsing is necessary
  else {
    // XXX Here we have a list of tokens, plus an Either. Thus stack should 
    // really be a list of Eithers, so we could map each agg.stack -- but only what if it is already an Either?
    // We need to ensure that *each* item in stack is an Either, from the very beginning.
    stack = [...agg.stack, parseToken(token)];
  }
  // do not return agg, only use slices from its properties
  return new Right({
    stack, 
    steps, 
    first: agg.first, 
    index: newIndex
  });
}

function expandAlias (parsed : Alias, inStack : Literal[], index : number) : Token[] {
  // Currently this *doesn't* use the given stack... it should, shouldn't it?
  let result = parseProgram(parsed.value, inStack, false, index);
  // It would be better not to have a 'value' field at all, but rather
  // to include any style in the objects (which will be later needed anyway
  // for typechecking etc., in this way we can denote multiple objects as
  // resulting from a step -- as is the case in alias-expansion.
  const expansionStep = {
    stack: [...inStack, ...parsed.value],
    index: index
  };
  const steps = [expansionStep, ...result.steps];
  const stack = [...result.stack]; // [...x] needed?
  return [steps, stack];
}

// TODO: this needs to be passing the entire stack back as part of the steps.
function parseFunction(parsed : any => any, inStack : Literal[], index : number) {
  let steps = [];
  let stack = [];
  if (parsed.type === 'alias') {
    return expandAlias(parsed, inStack, index);
  }
  else {
    stack = exec(parsed, inStack, index);
    steps = [...steps, {stack, index}]; // steps is a pair of stack, index
  }
  // index is returned as part of steps
  return [steps, stack];
}

// This is non-recursive, so it should return a single value. It will
// also not change the index.
function exec(func, stack, index : number) : Either { // TODO parameterize
  const requiredProperties = ['fn', 'arity', 'display'];
  requiredProperties.forEach(p => {
    if (! func.hasOwnProperty(p)) {
      //throw Error('no property ');
      return new Left(`No property, ${p}`)
    }
  });
  // TODO: later check others
  if (typeof func.fn !== 'function') {
    console.log(func);
    //throw Error(`fn is not a function`)
    return new Left(`${String(fn)} is Not a function`);
  }

  // use R.splitAt(func.arity, stack)
  //const newStack = stack.slice(0, func.arity);
  //const args = stack.slice(-func.arity);
  const [rest, args] = R.splitAt(-func.arity, stack);

  //console.log(args); // console.dir gives error: "can't remove stream listener"
  const result = func.fn.apply(null, args);
  //func.fn(...args);

  // This raises a question: do we really need to duplicate the stack under
  // left? For that matter, do we need right either?
  // We *will* need in steps eventually, but could we just return value
  // from here?
  return [...rest, result];
}

// TODO: try this with plus(x,y) and incr(x)
// where incr is an alias that expands to `x 1 plus`

export default parse;
