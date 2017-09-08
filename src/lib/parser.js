import literals from './literals';
import library from './library';

const parseToken = (token) => {
  if (literals.has(token)) {
    // Interpret each token as well
    return literals.get(token);
  }
  else if (library.has(token)) {
    return library.get(token);
  }
}

const parse = (list) => list.reduce((agg, token, index, array) => {
  // agg is {stack: (unconsumed tokens)], [print list])
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
