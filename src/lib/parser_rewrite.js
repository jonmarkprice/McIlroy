import library from './library';
import * as R from 'ramda';

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
  else if (typeof token === 'object' && token.type === 'alias') {
    // This will likely show up as list!
    return token.value.map(parseToken);
  }
  else {
    throw Error('Not parsable');
  }
}

// Maybe I should rewrite to make this pure...
// it would then need rest, steps, etc.
// but I would need to... replace agg?
// This needs to recur
function parseFunction(fn, steps, stack, rest) {

  const args  = stack.slice(-func.arity);
  const value = func.fn.apply(null, args);

  if (func.type === 'alias') {
    agg.stack.push(':');
    for (let elem of func.value) {
      // XXX: this will not work.
      // At this point it is already too late...
      // unless we can modify the list *as* it is being processed...

      // Can we recur? Yes!
      // TODO: set rest.
      rest = [...func.value, ':', ...rest]
      agg.stack.push(elem);
    }
  }

  for (let i = 0; i < func.arity; i += 1) {
    stack.pop();
  }
  steps.push({
    left  : stack.slice(),
    value : value,
    right : rest
  });
  stack.push(value);


  else {
    const args  = agg.stack.slice(-func.arity);
    const value = func.fn.apply(null, args);
    for (let i = 0; i < func.arity; i += 1) {
      agg.stack.pop();
    }
    agg.steps.push({
      left  : agg.stack.slice(),
      value : value,
      right :  //array.slice(index + 1)
    });
    agg.stack.push(value);
  return [stack, steps]
};

// TODO
function parseListLiteral() {
  let stackSize = agg.stack.length;
  // assume stackSize > 0
  // assume agg.stack contains '['
  let found = false;
  let dropped = 0;
  let list = [];
  for (let i = stackSize - 1; i >= 0; i -= 1) {
    dropped += 1;
    if (agg.stack[i] === '[') {
      found = true;
      const res = R.splitAt(i, agg.stack);
      const rest = res[0];
      list = R.drop(1, res[1]);
      agg.steps.push({
        left  : rest,
        value : list,
        right : array.slice(index + 1)
      });
      break;
    }
  }
  if (found) {
    for (let i = 0; i < dropped; i += 1) { // OR use splice
      agg.stack.pop();
    }
    agg.stack.push(list);
  }
  else {
    throw Error('No matching [ found!');
  }

  // TODO return
}

function reducer(agg, token, index, array) {
  switch (token) {
    case ':':
      const func  = agg.stack.pop();
      const [stack, steps] = pushFunction(func, agg.steps, agg.stack,
                                          array.slice(index + 1));
      // TODO stack, steps
      break;
    case '[':
      parseListLiteral(); // TODO
      break;
    case ']':
      agg.stack.push(']');
      break;
    default:
      agg.stack.push(parseToken(token));
      break;
  }
  return agg;
}

function parse(list) {
  return list.reduce(reducer, {stack: [], steps: []});
}

export default parse;
