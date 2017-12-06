const S = require('sanctuary');
const { Left, Right, env } = S;
const R = require('ramda');
//const U = S.create({checkTypes: false, env});

// TODO : Write tests for this.
// TODO : try to use this is tokenizer to reduce duplicated effort.
// This should also be easier to test.
/**
 * @param {any} valu
 * @ereturn {Either<Type>}
 */
function infer(value) { // maybe Literal
    // NOTE: This is simpler than tokenize() because it does not
    // need to look up a string to see if it a token. It also does
    // not need to deal with Aliases.
    const supported = new Set(['Array', 'Boolean', 'Number']);
    const inferred = R.type(value); // string
    if (supported.has(inferred)) {
        if (inferred === 'Array') {
          return Right({name: 'List'});
        }
        else {
          return Right({name: inferred});
        }
    }
    else if (inferred === 'String' && value.length === 1) {
        return Right({name: 'Char'});
    }
    // XXX: This seems to break with functors
    else if (inferred === 'Object') {
        // const allTrue = R.reduce(R.and, true);
        /*
        const propChecks = R.juxt([
            R.propIs('Function', 'fn'),
            R.propIs('Number', 'arity'),
            R.propIs('String', 'display')
        ]);
        if (allTrue(propChecks(value))) {
            return Right({name: 'Function'});
        }*/
        if (typeof value.fn == 'function' &&
            typeof value.arity == 'number' &&
            typeof value.display == 'string'
        ) {
          return Right({name: 'Function'});
        }
        else {
          return Left('Object is not a proper function.');
        }
    }
    else {
        console.log('== TYPE INFERENCE ==');
        console.log(value);
        return Left('Cannot infer type.');
    }
}

// Takes a simple value, returns Either of a wrapped value
// XXX: This needs to take a heterogenous list
// TODO: probably use U instead of S
function wrap(x) {
  if (Array.isArray(x)) { 
    const template = {type: {name: 'List'}, token: 'Value'};
    const eithers = x.map(wrap); // Recur. Return an array of Eithers
    const values = S.sequence(S.Either, eithers) // Sequence into a single Either
    return S.map(x => R.assoc('value', x, template), values);
  }
  else {
    // console.log('---- WRAPPING -------');
    const template = {value: x, token: 'Value'};
    return S.map(x => R.assoc('type', x, template), infer(x)); // returns an Either
  }
}

// NOTE: This will not work with Sanctuary since it can return a heterogenous list
function unwrap(x) {
  // should it take a maybe? // NO. can map if need be...
  //if (x.type.name === 'List') {
  if (Array.isArray(x.value)) {
    return x.value.map(unwrap); 
  }
  else return x.value;
}


module.exports = {
  infer
  , wrap
  , unwrap
}

