import parse from '../lib/parser';

export const run = (...program) => {
  const stack = parse(program).stack;
  if (stack.length === 1) {
    // The only item on the stack.
    return stack[0];
  }
  else {
    return Error('Stack has more than one item.');
  }
}
