import { Either } from 'monet';
import * as R from 'ramda';

type ParserOut = {
  stack : any[],
  steps : any[]
}

type AccObj = {
  steps : any[],
  stack : any[],
  first : boolean,
  index : number
}

type Acc = Either<string, AccObj>;

type Token = string | boolean | number | any[] | any;
// currently we circumvent type checking with any

// What it do?
/*
export function application(acc : Acc) : Acc {
  return Either.Left('');  
} */

function parse(program : any[]) : ParserOut {
  let steps = [];
  const output = parseProgram(program, [], true, 0);
  const  leftover = output; // output.stack.slice(-1);
  return {stack: leftover, steps: steps};
}

function parseProgram(list : any[], 
                      inStack : any[], 
                      first : boolean,
                      index : number) : any[] {
  return list.reduce(execToken, {
    stack: inStack,
    steps: [],
    first: first,
    index: index
  }); 
}

function execToken(accIn : Acc, token : any) : Acc {
  // Short circuit if we are already in an error state.
  if (accIn.isLeft) return accIn;
  
  const acc = accIn.right();
  let steps = [];
  let stack = [];
  const newIndex = (acc.first) ? acc.index + 1
                                : acc.index;
  if (token === ':') { // execute a funcaggtion
    const fn = R.last(acc.stack);
    const rest = R.dropLast(1, acc.stack);
    [steps, stack] = parseFunction(fn, rest, newIndex)
  }
  else if (token === ']') {
    // Traverse backwards until we find the latest '['
    // then split the stack [...]
    const stackSize = acc.stack.length;
    let found = false;
    // iterating backwards
    for (let i = stackSize; i >= 0; i -= 1) {
      const [left, right] = R.splitAt(i, acc.stack);
      const contents = R.drop(1, right);
      stack = [...left, contents];
      steps = [{stack: stack, index: newIndex}]; // TODO: this should be a type
      found = true;
      break;
    }

    // Instead,  return an Either
    if (! found) {
      //throw Error('No matching "[" found');
      return Either.Left('No matching "[" found');
    }
  }
  // parse the token
  else {
    stack = [...acc.stack, parseToken(token)];
  }
  return Either.Right({
    stack : stack,
    steps : steps,
    first : acc.first,
    index : newIndex
  });
}

function parseToken(token : Token) : any {
  if (token === ':') {
    return ':'; // {type: 'syntax', value: ':'};
  }
  // TODO
  //else if ()

  // process arrays
  else if (Array.isArray(token)) {
    return token.map(parseToken);
    // {type: 'list', value: token.map(...)};
  }
  
  else if (typeof token === 'boolean') {
    return Boolean(token); // {type: 'boolean', value: token};
  }

  else if (typeof token === 'number') {
    return Number(token); // {type: 'number, value: token};
    // TODO: check for NaN
  }

  else if (typeof token === 'string' && token.length === 1) {
    return token; // {type: 'char', value: token};
    // TODO check for legal char
  }

  else if (typeof token === 'object' && token.type === 'alias') {
    return token;
  }

  //else invalid
  // TODO: I guess this doesn't process functions...
}

// parseFunction
export function parseFunction(
  parsed  : any[],
  inStack : any[],
  index   : number
) : any[] {
  let steps = [];
  let stack = [];
  if (parsed.type === 'alias') {
    return expandAlias(parsed, inStack, index);
  }
  else {
    stack = exec(parsed, inStack, index);
    steps = [...steps, {stack: stack, index: index}];
  }
  return [steps, stack];
}

// exec
export function exec(
    func  : any, // () => ()
    stack : any[],
    index : number
  ) : any { // TODO
  // TODO check requiredProperties
  // if ...

  const [rest, args] = R.splitAt(-func.arity, stack);
  const result = func.fn.apply(null, args); // needed?
  return [...rest, result];
}

export function expandAlias(
    parsed  : any[],
    inStack : any[],
    index   : number
) : any
{
  let result = parseProgram(parsed.value, inStack, false, index);
  const expansionStep = { // TODO type
    stack: [...inStack, ...parsed.value],
    index: index
  };
  const steps = [expansionStep, ...result.steps];
  const stack = [...result.stack];
  return [steps, stack];
}

// TODO: export all!