import library from './library';

const parseToken = (token) => {
  // TODO : check for character
  // Process arrays
  if (Array.isArray(token)) {
    return token.map(parseToken);
  }
  else if (typeof token === 'boolean') {
    return Boolean(token)
  }
  // Check for number
  else if (typeof token === 'number') {
    return Number(token);
  }
  else if (library.has(token)) {
    return library.get(token);
  }
  else {
    throw Error('Not parsable');
  }
}

const parse = (list) => list.reduce((agg, token, index, array) => {
  if (token === ':') {
    const func = agg.stack.pop();
    const args = agg.stack.slice(-func.arity);
    const value = func.fn.apply(null, args);

    for (let i = 0; i < func.arity; i += 1) {
      agg.stack.pop(); // pop off used elements
    }
    agg.steps.push({
      left  : agg.stack.slice(),
      value : value,
      right : array.slice(index + 1)
    });
    agg.stack.push(value);
  }
  else {
    agg.stack.push(parseToken(token));
  }
  return agg;
}, {stack: [], steps: []});

export default parse;
