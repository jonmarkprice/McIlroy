import parse from '../common/lib/parser';

export const run = (...program) => {
  const stack = parse(program).stack;
  if (stack.length === 1) {
    // The only item on the stack.
    if (Array.isArray(stack[0])) {
      return stack[0].map(literal);
    }
    else {
      return literal(stack[0]);
    }
  }
  else {
    return Error('Stack has more than one item.');
  }
}

// TODO: import type Parsed
export function literal(obj /*: Parsed */) /*: Literal*/ {
  if (obj.value !== undefined) return obj.value;
  // could also check allowed types...
  else return obj;
}
// 5 failed:
// list-constr, logic(3), applic
