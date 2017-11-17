const R = require('ramda');
const display = require('./display');
const { t } = require('../../tests/tokens');

// types: list, any, string, char, number, integer....
const library = new Map([
  ['cons', {
    display: 'cons',
    arity: 2,
    types: {
      in: [t.list, t.any],
      out: t.list
    },
    fn: (list, elem) => R.append(elem, list)
  }],
  ['replicate', {
    display: 'replicate',
    arity: 2,
    types: {
      in: [t.var(1), t.num], // or int?
      out: t.list // of t.var(1)
    },
    fn: R.repeat
  }],
  ['sum', {
    display: 'sum',
    arity: 1,
    types: {
      in: [t.list], // of t.num
      out: t.num
    },
    fn: R.sum
  }],
  ['map', {
    display: 'map',
    arity: 2,
    types: {
      in: [t.list, t.fn],
      out: t.any // fn.types.out
    },
    fn: (list, f) => list.map(f.fn)
  }],
  ['not', {
    display: 'not',
    arity: 1,
    types: {
      in: [t.bool],
      out: t.bool
    },
    fn: R.not
  }],
  ['curry', {
    display: 'curry',
    arity: 2,
    types: {
      in: [t.any, t.fn], // f.types.in[0]
      out: t.fn
    },
    fn: (x, f) => {
      console.log(x);
      console.log(f);
      console.log('--------');
      return ({
        display: `(${display(x)} ${f.display}) curry`,
        arity: 1,
        types: {
          in: [t.any],
          out: t.any
        },
        fn: (y) => {
          console.log(f);
          console.log(x);
          console.log(y);
          return f.fn.call(null, x, y)
        }
      })
    }
  }],
  ['flip', {
    display: 'flip',
    arity: 1,
    types: { 
      in: [t.fn],
      out: t.fn
    },
    fn: f => ({
      display: `(${f.display}) flip`,
      arity: 2,
      fn: (x, y) => f.fn.call(null, y, x),
    })
  }],
  ['+', {
    display: '+',
    arity: 2,
    types: {
      in: [t.num, t.num],
      out: t.num
    },
    fn: (x, y) => y + x 
    // R.add
  }],
  ['-', {
    display: '-',
    arity: 2,
    types: {
      in: [t.num, t.num],
      out: t.num
    },
    fn: (x, y) => x - y
  }],
  ['*', {
    display: '*',
    arity: 2,
    types: {
      in: [t.num, t.num],
      out: t.num
    },
    fn: (x, y) => x * y
  }],
  ['^', {
    display: '^',
    arity: 2,
    types: {
      in: [t.num, t.num],
      out: t.num
    },
    fn: (x, y) => Math.pow(x, y)
  }],
  ['/', {
    display: '/',
    arity: 2,
    types: {
      in: [t.num, t.num],
      out: t.num
    },
    fn: (x, y) => x - y
  }],
  ['%', {
    display: '%',
    arity: 2,
    types: {
      in: [t.num, t.nu],
      out: t.num
    },
    fn: (x, y) => x % y
  }],
  ['and', {
    display: 'and',
    arity: 2,
    types: {
      in: [t.bool, t.bool],
      out: t.bool
    },
    fn: (x,y) => x && y //R.and
  }],
  ['or', {
    display: 'or',
    arity: 2,
    types: {
      in: [t.bool, t.bool],
      out: t.bool
    },
    fn: (x,y) => x || y //R.or
  }],
  ['concat', {
    display: 'concat',
    arity: 2,
    types: {
      in: [t.list, t.list],
      out: t.list
    },
    fn: (x, y) => R.concat(x, y) // Don't curry
  }],
  ['reduce', {
    display: 'reduce',
    arity: 3,
    types: {
      in: [t.list, t.fn, t.any], // f.types.in[0]
      out: t.any // f.types.out
    },
    fn: (list, f, base) => list.reduce(f.fn, base)
  }],
  ['zip', {
    display: 'zip',
    arity: 2,
    types: {
      in: [t.list, t.list],
      out: t.list
    },
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
    types: {
      in: [t.var(1)],
      out: t.var(1)
    },
    fn: R.identity
  }],
  // apply the same data to a list of functions.
  // or name: all / toEach / eachOf / applyAll / interpret / function map
  // Should be able implement with flip, map and apply, or almost trivially:
  // N replicate : [f1, f2, ... fN] zip : apply map :
  ['into', { // or copyTo, tee, ...
    display: 'into',
    arity: 2,
    types: {
      in: [t.any, t.list], // of functions
      out: t.list
    },
    fn: (data, fns) => fns.map(f => f.fn(data))
  }],
  ['apply', {
    display: 'apply',
    arity: 2,
    types: {
      in: [t.list, t.fn],
      out: t.any // TODO: later use the fn ret type
    },
    // XXX: This could easily break
    fn: (args, f) => {
      console.log(f);
      console.log(typeof f);
      console.log(args);
      return f.fn.apply(null, args);
    }
    //fn: (args, f) => R.apply(f.fn, args)
  }],
  // renamed apply to eval() since that is what it does.
  // it takes a data structure and evaluates it as a function call
  ['eval', {
    display: 'eval',
    arity: 1,
    types: {
      in: [t.list],
      out: t.any
    },
    fn: list => R.last(list).fn.apply(null, list.slice(0, -1))
  }],
  /* This can be implemented with:
    "..." 2 replicate : [head, tail] zip : apply map :
    Or
  */
  ['split', {
    display: 'split',
    arity: 1,
    types: {
      in: [t.list], // of var(1)
      out: t.list // or tuple of (var(1), list of var(1))
    },
    fn: list => [list[0], list.slice(1)]
  }],
  ['uppercase', {
    display: 'uppercase',
    arity: 1,
    types: {
      in: [t.char],
      out: t.char
    },
    fn: char => char.toUpperCase()
  }],
  ['lowercase', {
    display: 'lowercase',
    arity: 1,
    types: {
      in: [t.char],
      out: t.char
    },
    fn: char => char.toLowerCase()
  }],
  ['length', {
    display: 'length',
    arity: 1,
    types: {
      in: [t.list],
      out: t.num // technically int
    },
    fn: R.length
  }],
  ['succ', {
    display: 'succ', // alternate names: inc(r)(ement)
    arity: 1,
    types: {
      in: [t.num], // technically int
      out: t.num
    },
    fn: R.inc
  }],
  ['=', {
    display: '=', // alternate names: eq(ual)
    arity: 2,
    types: {
      in: [t.any, t.any], 
      out: t.bool
    },
    fn: R.equals
  }],
  ['filter', {
    display: 'filter',
    arity: 2,
    types: {
      in: [t.list, t.fn],
      out: t.list // of bool
    },
    fn: (list, cond) => list.filter(x => cond.fn.call(null, x))
  }],
  ['compose', {
    display: 'compose',
    arity: 2,
    types: {
      in: [t.fn, t.fn],
      out: t.fn
    },
    fn: (f, g) => ({
      display: `(${f.display}, ${g.display}) compose`,
      arity: f.arity,
      types: {
        in: f.types.in,
        out: g.types.out,
      },
      fn: R.pipe(f.fn, g.fn) // this seems wrong... why not compose?
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
