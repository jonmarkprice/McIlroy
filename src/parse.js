/* import {
    view
  , over
  , lensProp
  , pipe
  , equals
} from 'ramda'; */
import * as R from 'ramda';

//@flow
type Literal = string | number | boolean; //| any[];

type Token = {
  type : string,
  value : Literal
};

type Agg = {
  steps : Token[], // or Error
  stack : Token[]
};

type Either<T, S> = Left<T> | Right<S>;

class Left<T> {
  value : T;
  constructor(val : T) {
    this.value = val;
  }

  // XXX: should this be any -> any?
  map(f : T => T) : Left<T> {
    return this;
  }

  equal(val : any) : boolean { //false { // is this good practice?
    return false;
  }

  print() {
    console.log(this.value);
  }
}

class Right<T> {
  value : T;
  constructor(val : T) {
    this.value = val;
  }

  map(f : T => T) : Right<T> {
    return new Right(f(this.value));
  }

  equal(val : any) : boolean {
    //return R.equals(this.value, val);
    return this.value === val;
  }

  print() {
    console.log("The functor says: ");
    console.log(this.value);
  }
}

// Parse a simple program
function parse(program : Token[]) : Either<string, Agg> { //Step[] {
  // Optional: map a parser over the Literals
  // or run an any() with a checker function
  const init : Right<Agg> = new Right({steps: [], stack: []});
  // Array.reduce :: (b -> a -> b) -> b -> [a] -> [b]
  return program.reduce(reducer, init);
}

function reducer(agg : Either<string, Agg>, curr : Token) : Either<string, Agg> {
  if (curr.type == 'syntax') {
    switch(curr.value) {
      case ':':
        return application(agg);
        //break;
      case '[':
        break;
      case ']':
        break;
    }
    return new Right({steps: [], stack: []});
  }
  else {
    const stack = R.lensProp('stack');
    return agg.map(R.over(stack, R.append(curr)));
  }
}

// @breif Apply the application operator.
function application(agg : Either<string, Agg>) : Either<string, Agg> {
  //if (R.last(agg.stack).type == 'function') { // XXX hardcode for now
  // To compare functors, we could either use a general comparision, and create new functor containing
  // to co

  // Check if agg.stack[-1].type == 'function'
  /*agg.print();

  const stackLens = R.lensProp('stack');
  //const valueLens = lensProp()
  const topOfStack : Either<string, Agg> = agg.map(R.pipe(
    R.over(stackLens, R.last),
    R.view(stackLens)
  ));*/
  const type_ = R.lensProp('type');
  const last  = R.lens(R.last, R.update(-1));
  const stack = R.lensProp('stack');

  /*
    R.pipe(R.prop('stack'), R.last, R.prop('type')),
    R.always(undefined)
  );*/
  /*
  What arguments come in to lens?
  (s -> a) -> ((a, s) -> s) -> Lens s a
  what are s and a?

  Well for, say R.last, s is the whole item.
  and a is the new item..

  so (arg, item) -> item

  Note that the output of the getter must be the same as the input
  to the setter.

  so if the getter is R.last, the input needs to take an element

  in the case of prop, prop(x) returns a value, and assoc(x) takes an value
  so it works.

  So if the getter is last, the setter should take an element, ... like append...
  ok that gave me the list + the element.

const data = [1, 2, 3]
const aLens = lens(last, append)
view(aLens, data)   // 3
set(aLens, 4, data) // [1, 2, 3, 4]

  I want to drop the last item.
  So my append got: append(4, [1, 2, 3])
  i.e. f(x, y) -> append(x, y)

  I need to give it: append(4, drop(1, [1, 2, 3]))
  i.e. f(x, y) -> append(x, drop(1, y))

Here it is:
  const cLens = lens(last, (x, y) => append(x, dropLast(1, y)))
  view(cLens, data)
  set(cLens, 4, data)

But guess what, that's exactly what update(-1) does!
  const dLens = lens(last, update(-1))
  view(dLens, data)
  set(dLens, 4, data)





  */
  //const last2 = R.lensPath(['stack', R.lastIndexOf, 'value']);

  //if (topOfStack.map(view(lensProp('value'))).equal('+')) {
  //if (agg.map(R.view(R.compose(R.lensProp('stack')))).equal([])) {
    //R.compose(stack, last, type_))).equal('string')) {
  if (agg.map(R.view(R.compose(stack, last, type_))).equal('string')) {
    console.log('STRING');
    //agg.map(R.set(last, '-')).print(); // -> undef

    // if (library.has(x)) {
    //  fn = library.get(x) }
    const lib = ['+'];
    /*
      '+': {
        name: 'plus',
        types: {'in': ['number', 'number'], 'out': 'number'},
        fn: (x, y) => x + y
      }
    ]; */

    const sym = agg.map(R.view(R.compose(stack, last, R.lensProp('value'))));
    if (R.any(sym.equal.bind(sym), lib)) {
      //if (agg.map(R.view(R.compose(stack, last, R.lensProp('value')))).equal('+'))
      // fn = library.get(x)
      // TODO: how to get x? -- make get() function that takes a Functor?
      console.log('PLUS!')
      // Now check if it is in our library.
    }
  }
  else {
    console.log('NOPE');
    //agg.map(R.view(last)).print();
  }

  return new Left('Functions not supported.');
}

//function getFunction(token : Either<string, Agg>, )
// Ahhh!!!! functors make everything so hard!


function inferType(lit : Literal) : Token {
  switch (typeof lit) {
    case 'string':
      if (lit === ':') {
        return {type: 'syntax', value: lit};
      }
      else {
        return {type: 'string', value: lit};
      }
    case 'number':
      return {type: 'number', value: lit};
    case 'boolean':
      return {type: 'boolean', value: lit};
    default:
      return {type: 'unk', value: false};
  }
}

const tokens : Token[] = [1, 2, 3].map((x : Literal) => inferType(x));
//console.log(tokens);

const result : Either<string, Agg> = parse(tokens);
console.log(result);
console.log('JSON: ');
console.log(JSON.stringify(result));

const tokens2 : Token[] = [1, 1, '+', ':'].map(inferType);
const result2 : Either<string, Agg> = parse(tokens2);
console.log(result2);
