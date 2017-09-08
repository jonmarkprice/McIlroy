import display from './display';
import { equal } from './helpers';

// Possibly (later) divide into categories, such as
// math, lists, etc. or into built-in and derived
// TODO make sure I have each of theses
/*const FUNCTIONS = [
  ':', '+', '-', '*', '/', '^', '%', 'apply',
  'and', 'capitalize', 'concat', 'cond', 'cons',
  'equals', 'id', 'length', 'map', 'not', 'or',
  'reduce', 'split', 'succ'
];
const VALUES = ['True', 'False', '[ ]', '0'];
*/

const library = new Map([
  ['cons', {
    name: 'cons',
    arity: 2,
    // This implementation appears to be off
    // `cons([], [1, 2])` = [[1, 2]]
    // [].concat(1) and [].concat([1]) both return [1]
    // this is not the behavior I want
    fn: (list, elem) => Array.isArray(elem) ?
      list.concat([elem]) : list.concat(elem)
  }],
  ['replicate', {
    name: 'replicate',
    arity: 2,
    fn: (item, n) => Array(n).fill(item)
  }],
  ['sum', {
    name: 'sum',
    arity: 1,
    fn: (list) => list.reduce((a, b) => a + b, 0)
  }],
  ['map', {
    name: 'map',
    arity: 2,
    fn: (list, f) => list.map(f.fn)
  }],
  ['not', {
    name: 'not',
    arity: 1,
    fn: (x) => !x
  }],
  ['partial', {
    name: 'partial',
    arity: 2,
    fn: (x, f) => ({
      name: 'partial',
      arity: 1,
      fn: (y) => f.fn(x, y),
      wraps: {name: f.name, data: display(x)}
    })
  }],
  ['flip', {
    name: 'flip',
    arity: 1,
    fn: f => ({
      name: 'flip',
      arity: 2,
      fn: (x, y) => f.fn(y, x),
      wraps: {name: f.name}
    })
  }],
  ['+', {
    name: '+',
    arity: 2,
    fn: (x, y) => x + y
  }],
  ['-', {
    name: '-',
    arity: 2,
    fn: (x, y) => x - y
  }],
  ['*', {
    name: '*',
    arity: 2,
    fn: (x, y) => x * y
  }],
  ['^', {
    name: '^',
    arity: 2,
    fn: (x, y) => Math.pow(x, y)
  }],
  ['/', {
    name: '/',
    arity: 2,
    fn: (x, y) => x / y
  }],
  ['%', {
    name: '%',
    arity: 2,
    fn: (x, y) => x % y
  }],
  ['and', {
    name: 'and',
    arity: 2,
    fn: (x, y) => x && y
  }],
  ['or', {
    name: 'or',
    arity: 2,
    fn: (x, y) => x || y
  }],
  ['concat', {
    name: 'concat',
    arity: 2,
    /* may have to be careful with this for strings.. */
    fn: (x, y) => x.concat(y)
  }],
  ['reduce', {
    name: 'reduce',
    arity: 3,
    fn: (list, f, base) => list.reduce(f.fn, base)
  }],
  ['zip', {
    name: 'zip',
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
    name: 'id',
    arity: 1,
    fn: x => x,
  }],
  // apply the same data to a list of functions.
  // or name: all / toEach / eachOf / applyAll / interpret / function map
  // Should be able implement with flip, map and apply, or almost trivially:
  // N replicate : [f1, f2, ... fN] zip : apply map :
  ['into', { // or copyTo, tee, ...
    name: 'into',
    arity: 2,
    fn: (data, fns) => fns.map(f => f.fn(data))
  }],
  ['apply', {
    name: 'apply',
    arity: 2,
    fn: (args, f) => f.fn.apply(null, args)
  }],
  // renamed apply to eval() since that is what it does.
  // it takes a data structure and evaluates it as a function call
  ['eval', {
    name: 'eval',
    arity: 1,
    fn: list => list[list.length - 1].fn.apply(null, list.slice(0, -1))
  }],
  /* This can be implemented with:
    "..." 2 replicate : [head, tail] zip : apply map :
    Or
  */
  ['split', {
    name: 'split',
    arity: 1,
    fn: list => [list[0], list.slice(1)]
  }],
  ['uppercase', {
    name: 'uppercase',
    arity: 1,
    fn: char => char.toUpperCase()
  }],
  ['lowercase', {
    name: 'lowercase',
    arity: 1,
    fn: char => char.toLowerCase()
  }],
  ['length', {
    name: 'length',
    arity: 1,
    fn: list => list.length
  }],
  ['succ', {
    name: 'succ', // alternate names: incr(ement)
    arity: 1,
    fn: num => Number(num) + 1
  }],
  ['=', {
    name: '=', // alternate names: eq(ual)
    arity: 2,
    fn: (x, y) => equal(x, y)
  }]
  /* TODO
   * cond (if ... else ...)
   * filter
   */
]);

export default library;
