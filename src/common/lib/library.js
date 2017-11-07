const R = require('ramda');
const display = require('./display');
// Is this circular?

// types: list, any, string, char, number, integer....
const library = new Map([
  ['cons', {
    display: 'cons',
    arity: 2,
    types: ['list', 'any'],
    fn: (list, elem) => R.append(elem, list)
  }],
  ['replicate', {
    display: 'replicate',
    arity: 2,
    types: ['any', 'integer'],
    fn: R.repeat
  }],
  ['sum', {
    display: 'sum',
    arity: 1,
    types: ['list'],
    fn: R.sum
  }],
  ['map', {
    display: 'map',
    arity: 2,
    types: ['list', 'function'],
    fn: (list, f) => list.map(f.fn)
  }],
  ['not', {
    display: 'not',
    arity: 1,
    types: ['boolean'],
    fn: R.not
  }],
  ['curry', {
    display: 'curry',
    arity: 2,
    types: ['any', 'function'],
    fn: (x, f) => ({
      display: `(${display(x)} ${f.display}) curry`,
      arity: 1,
      fn: (y) => f.fn.call(null, x, y),
    })
  }],
  ['flip', {
    display: 'flip',
    arity: 1,
    types: ['any'],
    fn: f => ({
      display: `(${f.display}) flip`,
      arity: 2,
      fn: (x, y) => f.fn.call(null, y, x),
    })
  }],
  ['+', {
    display: '+',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => x + y
  }],
  ['-', {
    display: '-',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => x - y
  }],
  ['*', {
    display: '*',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => x + y
  }],
  ['^', {
    display: '^',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => Math.pow(x, y)
  }],
  ['/', {
    display: '/',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => x / y
  }],
  ['%', {
    display: '%',
    arity: 2,
    types: ['number', 'number'],
    fn: (x, y) => x % y
  }],
  ['and', {
    display: 'and',
    arity: 2,
    types: ['boolean', 'boolean'],
    fn: (x,y) => x && y //R.and
  }],
  ['or', {
    display: 'or',
    arity: 2,
    types: ['boolean', 'boolean'],
    fn: (x,y) => x || y //R.or
  }],
  ['concat', {
    display: 'concat',
    arity: 2,
    types: ['list', 'any'],
    fn: R.concat
  }],
  ['reduce', {
    display: 'reduce',
    arity: 3,
    types: ['list', 'function', 'any'],
    fn: (list, f, base) => list.reduce(f.fn, base)
  }],
  ['zip', {
    display: 'zip',
    arity: 2,
    types: ['list', 'list'],
    fn: (a, b) => {
      const len = Math.min(a.length, b.length);
      let result = [];
      for (let i = 0; i < len; i += 1) {
        result.push([a[i], b[i]]);
      }
      return result;
    }
    //R.zip // failing a test...
  }],
  ['id', {
    display: 'id',
    arity: 1,
    types: ['any'],
    fn: R.identity
  }],
  // apply the same data to a list of functions.
  // or name: all / toEach / eachOf / applyAll / interpret / function map
  // Should be able implement with flip, map and apply, or almost trivially:
  // N replicate : [f1, f2, ... fN] zip : apply map :
  ['into', { // or copyTo, tee, ...
    display: 'into',
    arity: 2,
    types: ['any', 'list'],
    fn: (data, fns) => fns.map(f => f.fn(data))
  }],
  ['apply', {
    display: 'apply',
    arity: 2,
    types: ['list', 'function'],
    fn: (args, f) => f.fn.apply(null, args)
  }],
  // renamed apply to eval() since that is what it does.
  // it takes a data structure and evaluates it as a function call
  ['eval', {
    display: 'eval',
    arity: 1,
    types: ['list'],
    fn: list => R.last(list).fn.apply(null, list.slice(0, -1))
  }],
  /* This can be implemented with:
    "..." 2 replicate : [head, tail] zip : apply map :
    Or
  */
  ['split', {
    display: 'split',
    arity: 1,
    types: ['list'],
    fn: list => [list[0], list.slice(1)]
  }],
  ['uppercase', {
    display: 'uppercase',
    arity: 1,
    types: ['char'],
    fn: char => char.toUpperCase()
  }],
  ['lowercase', {
    display: 'lowercase',
    arity: 1,
    types: ['char'],
    fn: char => char.toLowerCase()
  }],
  ['length', {
    display: 'length',
    arity: 1,
    types: ['list'],
    fn: R.length
  }],
  ['succ', {
    display: 'succ', // alternate names: inc(r)(ement)
    arity: 1,
    types: ['integer'],
    fn: R.inc
  }],
  ['=', {
    display: '=', // alternate names: eq(ual)
    arity: 2,
    types: ['any', 'any'],
    fn: R.equals
  }],
  ['filter', {
    display: 'filter',
    arity: 2,
    types: ['list', 'function'],
    fn: (list, cond) => list.filter(x => cond.fn.call(null, x))
  }],
  ['compose', {
    display: 'compose',
    arity: 2,
    types: ['function', 'function'],
    fn: (f, g) => ({
      display: `(${f.display}, ${g.display}) compose`,
      arity: f.arity,
      types: f.types,
      fn: R.pipe(f.fn, g.fn)
    })
  }]
]);

/* TODO
I need to figure out how I want this to actually be used...
['cond', {
  display: 'cond', // cond(ition)
  arity: 3,
  fn: (cond, aff, neg) => cond ? aff : neg
}], */

module.exports = library;
