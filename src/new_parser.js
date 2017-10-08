const R = require('ramda');

const library = new Map([
  ['plus', {
    arity: 2,
    fn: (x,y) => x + y
  }]
]);

//const run = (program) => parseProgram(program, [], true, 0);

function runProgram(input) {
  const program = input;
  const output = parseProgram(program, [], true, 0);

  let n = 0;
  for (let {stack, value, index} of output.steps) { // TODO: try destructuring assign. in loop
    // TODO: this is bad! A step needs to contain the entire stack
    // in addition to a value, and index.
    n += 1;
    console.log(JSON.stringify(program.slice(index)));
    console.log(`index ${index} of |${program.length}|`)
    let state = [...R.dropLast(1, stack), value, ...program.slice(index)];
    //let stateDisplay = state.map(x => display(x)); // later
    console.log(`Step ${n}: ${JSON.stringify(state)}`);
  }
}

// Main
//const program = [1, 1, 'plus', ':'];
const program = [5, {type: 'alias', display: 'incr', value: [1, 'plus', ':']}, ':'];
//const program = [5, {type: 'alias', display: 'incr', value: [1, 'plus']}, ':'];

// Currently 5 incr : is one step. It should be two:
// 1. 5 incr : -> 5 (1 plus :)
// 2. 5 1 plus : -> 6
runProgram(program);

function parseProgram(list, inStack, first, index) {
  //console.log('in ')
  return list.reduce(parseToken, {
    stack: inStack,
    steps: [],
    first: first,  // For tracking the index
    index: index // ''
  });
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

function parseToken(agg, token) { // also  index, array
  let steps = [];
  let stack = [];

  // index management:
  const newIndex = (agg.first) ? agg.index + 1 : agg.index;

  if (token === ':') {
    const fn = R.last(agg.stack);  //agg.stack.slice(0, -1); // take last
    const rest = R.dropLast(1, agg.stack);
    [steps, stack] = parseFunction(fn, rest, newIndex); // will need a copy of stack
    console.log(`stack: ${JSON.stringify(stack)}`);
    console.log(`steps: ${JSON.stringify(steps)}`);
  }
  // ... do whatever parsing is necessary
  else {
    stack = [...agg.stack, token];
  }
  // do not return agg, only use slices from it's properties
  return {stack, steps, first: agg.first, index: newIndex};
}

// TODO: this needs to be passing the entire stack back as part of the steps.
function parseFunction(parsed, inStack, index) {
  let steps = [];
  let stack = [];
  if (parsed.type === 'alias') {
    // Currently this *doesn't* use the given stack... it should, shouldn't it?
    console.log(`program ${JSON.stringify(parsed.value)}`);
    console.log(`inStack ${JSON.stringify(inStack)}`);
    console.log('---------------');
    let result = parseProgram(parsed.value, inStack, false, index);

    // It would be better not to have a 'value' field at all, but rather
    // to include any style in the objects (which will be later needed anyway
    // for typechecking etc., in this way we can denote multiple objects as
    // resulting from a step -- as is the case in alias-expansion.
    expansionStep = {
      stack: inStack,
      value: parsed.value , //XXX Not applicable
      index: index
    };
    steps = [expansionStep, ...result.steps];
    stack = [...result.steps]; // [...x] needed?

    console.log('---------------');
  }
  else {
    //[steps, stack] = exec(parsed, inStack, index);
    ({value, stack} = exec(parsed, inStack, index));
    // TODO: deal with value
    steps = [...steps, {stack, value, index}]; // steps is a pair of value, index

    console.log(stack);
  }
  // index is returned as part of steps
  return [steps, stack];
}

// This is non-recursive, so it should return a single value. It will
// also not change the index.
function exec(tok, stack, index) {
  if (library.has(tok)) {
    const func = library.get(tok);

    // use R.splitAt(func.arity, stack)
    //const newStack = stack.slice(0, func.arity);
    //const args = stack.slice(-func.arity);
    const [rest, args] = R.splitAt(-func.arity, stack);
    console.log(`stack: ${JSON.stringify(stack)}`);
    console.log(`rest: ${JSON.stringify(rest)}`);
    console.log(`args: ${JSON.stringify(args)}`);

    const result = func.fn(...args);
    console.log(`result: ${result}`)
    // This raises a question: do we really need to duplicate the stack under
    // left? For that matter, do we need right either?
    // We *will* need in steps eventually, but could we just return value
    // from here?
    return {
      value: result,
      stack: [...rest, result]
    };
  }
  else {
    throw Error('Not a function');
  }
}

// TODO: try this with plus(x,y) and incr(x)
// where incr is an alias that expands to `x 1 plus`
