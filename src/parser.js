'use strict';

if (process.argv.length !== 4) {
  const node = 'node'; //process.argv[0]; // Too verbose
  const file = 'parser.js'; // process.argv[1]
  console.log('Usage: node parser.js "<data>" "<string of commands>"\n');
  console.log('Note: <data> can be the empty string when the data desired to be interspersed ');
  console.log('thoughout the program, as in a traditional postfix calculator. e.g. "1 2 * 4 +"');
  console.log(`Try one of these example programs:
$ ${node} ${file} '42, 3, 1' '+ 0 reduce :'
    Sum.
$ ${node} ${file} '' '[] T cons : F cons :'
    Construct a list.
$ ${node} ${file} 'T, T, F' 'and T reduce :'
    All function.
$ ${node} ${file} "'b', 'y', 'e'" 'capitalize map :'
    Make string all-caps.
$ ${node} ${file} '1, 2, 3, 4' '2 ^ flip : partial : map : sum :'
    Sum of squares.
$ ${node} ${file} '15, 21, 9' '[] sum cons : length cons : into : / apply :'
    Average.
$ ${node} ${file} "'h', 'i'" 'split : [] capitalize cons : id cons : zip : eval map : concat [] reduce :'
    capitalize first letter.
`);
  process.exit();
}

const functions = new Map([
    ['cons', {
        arity: 2,
        // This implementation appears to be off
        // `cons([], [1, 2])` = [[1, 2]]
        // [].concat(1) and [].concat([1]) both return [1]
        // this is not the behavior I want
        fn: (list, elem) => Array.isArray(elem) ?
            list.concat([elem]) : list.concat(elem)
    }],
    ['replicate', {
      arity: 2,
      fn: (item, n) => Array(n).fill(item)
    }],
    ['sum', {
        arity: 1,
        fn: (list) => list.reduce((a, b) => a + b, 0)
    }],
    ['map', {
        // Can't map directly since f is an object {arity, fn}
        arity: 2,
        fn: (list, f) => list.map(f.fn)
    }],
    ['not', {
        arity: 1,
        fn: (x) => !x
    }],
    ['partial', {
        arity: 2,
        fn: (x, f) => ({arity: 1, fn: (y) => f.fn(x, y)})
    }],
    ['flip', {
      arity: 1,
      fn: f => ({arity: 2, fn: (x, y) => f.fn(y, x)})
    }],
    ['+', {
        arity: 2,
        fn: (x, y) => x + y
    }],
    ['-', {
        arity: 2,
        fn: (x, y) => x - y
    }],
    ['*', {
        arity: 2,
        fn: (x, y) => x * y
    }],
    ['^', {
      arity: 2,
      fn: (x, y) => Math.pow(x, y)
    }],
    ['/', {
      arity: 2,
      fn: (x, y) => x / y
    }],
    ['%', {
      arity: 2,
      fn: (x, y) => x % y
    }],
    ['and', {
        arity: 2,
        fn: (x, y) => x && y
    }],
    ['or', {
        arity: 2,
        fn: (x, y) => x || y
    }],
    ['concat', {
        arity: 2,
        /* may have to be careful with this for strings.. */
        fn: (x, y) => x.concat(y)
    }],
    ['reduce', {
        arity: 3,
        fn: (list, f, base) => list.reduce(f.fn, base)
    }],
    ['zip', {
        arity: 2,
        fn: (a, b) => {
            const len = Math.min(a.length, b.length);
            let result = [];
            for (let i = 0; i < len; i += 1) {
                result.push([a[i], b[i]]);
            }
            return result;
        }
    }],
    ['id', {
        arity: 1,
        fn: x => x,
    }],
    // apply the same data to a list of functions.
    // or name: all / toEach / eachOf / applyAll / interpret / function map
    // Should be able implement with flip, map and apply, or almost trivially:
    // N replicate : [f1, f2, ... fN] zip : apply map :
    ['into', { // or copyTo, tee, ...
      arity: 2,
      fn: (data, fns) => fns.map(f => f.fn(data))
    }],
    ['apply', {
      arity: 2,
      fn: (args, f) => f.fn.apply(null, args)
    }],
    // renamed apply to eval() since that is what it does.
    // it takes a data structure and evaluates it as a function call
    ['eval', {
        arity: 1,
        fn: list => list[list.length - 1].fn.apply(null, list.slice(0, -1))
    }],
    /* This can be implemented with:
      "..." 2 replicate : [head, tail] zip : apply map :
      Or
    */
    ['split', {
        arity: 1,
        fn: list => [list[0], list.slice(1)]
    }],
    ['capitalize', {
      arity: 1,
      fn: char => char.toUpperCase()
    }],
    ['length', {
      arity: 1,
      fn: list => list.length
    }]
    /* TODO
     * cond (if ... else ...)
     * equal(s)
     * filter
     */

]);
const literals  = new Map([
        ['[]', []],
        ['T', true],
        ['F', false]
]);



// const data = ['h', 'e', 'l', 'l', 'o']
// const data = process.argv[2] == '-' ? [] : process.argv[2].split(',').map(s => s.trim());
const input = process.argv[3];
// const input = 'split : [] capitalize cons : id cons : zip : apply map : concat [] reduce :'

const tokens = input.split(' ');
const isValid = (token) => token === ':'
        || (! isNaN(Number(token))
        // String, Char
        || functions.has(token)
        || literals.has(token));

// TODO: constraint to check: no intersection between functions and literals
let stack = []
if (process.argv[2] !== '') {
  // split input into tokens
  const tokens = process.argv[2].split(',').map(s => s.trim());

  let input = [];
  for (let token of tokens) {
    // First check literals, then functions
    if (! isNaN(Number(token))) {
        input.push(Number(token));
    }
    // TODO: Check for strings or chars
    else if (literals.has(token)) {
       // Interpret each token as well
       input.push(literals.get(token));
    }
    else if (/'[^']'/.test(token)) {
      input.push(token[1]); // middle character in string, e.g. "x" in "'x'"
    }
    else {
      console.log("Cannot parse input data.")
      process.exit();
    }
    // Skip characters for now
    stack = [input];
  }
}

// console.log(input);
if (tokens.every(isValid)) {
    for (let token of tokens) {
        // First check literals, then functions
        if (! isNaN(Number(token))) {
            stack.push(Number(token));
        }
        // TODO: Check for strings or chars
        else if (literals.has(token)) {
           // Interpret each token as well
           stack.push(literals.get(token));
        }
        else if (functions.has(token)) {
            stack.push(functions.get(token));
        }
        else if (token === ':') {
            let func = stack.pop();
            let args = stack.slice(-1 * func.arity);

            // Pop off used elements
            for (let i = 0; i < func.arity; i += 1) {
                stack.pop();
            }
            stack.push(func.fn.apply(null, args));
        }

        console.log(stack);
    }
}
else {
    console.log('The input string contains an invalid token!');
}
