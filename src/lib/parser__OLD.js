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
  else {
    throw Error('Not parsable');
  }
}

const parse = (list) => list.reduce((agg, token, index, array) => {
  if (token === ':') {
    const func  = agg.stack.pop();
    const args  = agg.stack.slice(-func.arity);
    const value = func.fn.apply(null, args);
    for (let i = 0; i < func.arity; i += 1) {
      agg.stack.pop();
    }
    agg.steps.push({
      left  : agg.stack.slice(),
      value : value,
      right : array.slice(index + 1)
    });
    agg.stack.push(value);
  }
  else if (token === ']') {
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
  }
  else if (token === '[') {
    agg.stack.push(token); // do not parse (XXX yet)
  }
  else {
    agg.stack.push(parseToken(token));
  }
  return agg;
}, {stack: [], steps: []});

export default parse;
