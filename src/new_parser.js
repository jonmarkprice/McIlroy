const R = require('ramda');

const library = new Map([
  ['plus', {
    arity: 2,
    fn: (x,y) => x + y
  }]
]);

// Main
const result = parseProgram([1, 1, 'plus', ':']);
console.log(result);

function parseProgram(list) {
  return list.reduce(parseToken, {
    stack: [],
    steps: []
  });
}

function parseToken(agg, token) { // also index, array
  let steps = [];
  let stack = [];
  if (token === ':') {
    const fn = R.last(agg.stack);  //agg.stack.slice(0, -1); // take last
    const rest = R.dropLast(1, agg.stack);
    [steps, stack] = parseFunction(fn, rest); // will need a copy of stack
    console.log(`stack: ${JSON.stringify(stack)}`);
    console.log(`steps: ${JSON.stringify(steps)}`);
  }
  // ... do whatever parsing is necessary
  else {
    stack = [...agg.stack, token];
  }
  // do not return agg, only use slices from it's properties
  return {stack, steps};
}

function parseFunction(parsed, inStack) {
  let steps = [];
  let stack = [];
  if (parsed.type === 'alias') {
    // Currently this *doesn't* use the given stack... it should, shouldn't it?
    [steps, stack] = parseProgram(parsed.value); // TODO
  }
  else {
    [steps, stack] = exec(parsed, inStack);
    console.log(stack);
  }
  return [steps, stack];
}

// XXX Dummy
function exec(tok, stack) {
  if (tok.type === 'alias') {
    throw Error('Not implemented');
  }
  else if (library.has(tok)) {
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
    return [['plus'], [...rest, result]];
  }
  else {
    throw Error('Not a function');
  }
}

// TODO: try this with plus(x,y) and incr(x)
// where incr is an alias that expands to `x 1 plus`
