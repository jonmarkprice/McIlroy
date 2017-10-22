// GOAL: integrate with rest of program
// next:
// Get list construction working

// TODO: consider first parsing each token...

import * as R from 'ramda';
import library from './library';

// XXX: this is rather ugly. Especially since I already *have* all the data,
// it's just organized by step and is missing the "rest" part.
// Also, do I really need stack? Is it just used for the final result?
const parse = (program) => {
  let steps = [];
  const output    = parseProgram(program, [], true, 0);
  const leftover  = output.stack.slice(-1);
  for (let {stack, index} of output.steps) {
    steps.push([...stack, ...program.slice(index)]);
  }
  return {stack: leftover, steps};
};

function parseProgram(list, inStack, first, index) {
  return list.reduce(execToken, {
    stack: inStack,
    steps: [],
    first: first,  // For tracking the index
    index: index // ''
  });
}

const parseToken = (token) => {
  if (token === ':') {
    return ':';
  }
  else if (library.has(token)) {
    return library.get(token);
  }
  // Process arrays
  else if (Array.isArray(token)) {
    return token.map(parseToken);
  }
  // Check for booleans
  else if (typeof token === 'boolean') {
    return Boolean(token)
  }
  // Check for number
  else if (typeof token === 'number') {
    return Number(token);
  }
  // Check for character (maybe later strings)
  else if (typeof token === 'string' && token.length === 1) {
    return token;
  }
  // TODO: add support for aliases
  else if (typeof token === 'object' && token.type === 'alias') {
    return token;
  }
  // TODO: add support for special syntax ([, ])
  else {
    throw Error('Not parsable');
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
function execToken(agg, token) { // also  index, array
  let steps = [];
  let stack = [];

  // index management:
  const newIndex = (agg.first) ? agg.index + 1 : agg.index;

  if (token === ':') {
    const fn = R.last(agg.stack);  //agg.stack.slice(0, -1); // take last
    const rest = R.dropLast(1, agg.stack);
    [steps, stack] = parseFunction(fn, rest, newIndex); // will need a copy of stack
  }
  // if token === '['
  else if (token === ']') {
    // traverse bacwards until if find the latest '['
    // then split the stack and make the right half into a list.
    const stackSize = agg.stack.length;

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
      throw Error('No matching "[" found!')
    }
  }
  // TODO do whatever parsing is necessary
  else {
    stack = [...agg.stack, parseToken(token)];
  }
  // do not return agg, only use slices from its properties
  return {stack, steps, first: agg.first, index: newIndex};
}

const expandAlias = (parsed, inStack, index) => {
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
function parseFunction(parsed, inStack, index) {
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
function exec(func, stack, index) {
  const requiredProperties = ['fn', 'arity', 'display'];
  requiredProperties.forEach(p => {
    if (! func.hasOwnProperty(p)) {
      throw Error('no property ');
    }
  });
  // TODO: later check others
  if (typeof func.fn !== 'function') {
    console.dir(func);
    throw Error(`fn is not a function`)
  }

  // use R.splitAt(func.arity, stack)
  //const newStack = stack.slice(0, func.arity);
  //const args = stack.slice(-func.arity);
  const [rest, args] = R.splitAt(-func.arity, stack);
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
