const library = new Map([
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

export default library;
