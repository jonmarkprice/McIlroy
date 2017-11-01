import * as R from 'ramda';
import { Either } from 'monet';

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

// Parse a simple program
function parse(program : Token[]) : Either<string, Agg> { //Step[] {
  // Optional: map a parser over the Literals
  // or run an any() with a checker function
  const init : Right<Agg> = Either.Right({steps: [], stack: []});

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
    return Either.Right({steps: [], stack: []});
  }
  else {
    const stack = R.lensProp('stack');
    return agg.map(R.over(stack, R.append(curr)));
  }
}

// @breif Apply the application operator.
function application(agg : Either<string, Agg>) : Either<string, Agg> {
  const last  = R.lens(R.last, R.update(-1));
  const stack = R.lensProp('stack');
  const top = R.compose(stack, last);
  if (agg
      .map(R.view(R.compose(top, R.lensProp('type'))))
      .map(R.equals(Either.Right('string')))
    ) {
    const lib = new Map([
      ['+', {
        name: 'plus',
        types: {'in': ['number', 'number'], 'out': 'number'},
        fn: (x, y) => x + y
      }]
    ]);

    const value = R.compose(top, R.lensProp('value'))
    const eq = (x) => agg.map(R.view(value)).map(R.equals(x));
    // use Array.from(lib.keys()) or just [...lib.keys()]
    if (R.any(eq, Array.from(lib.keys())) && agg.isRight()) {
      const tok = agg.map(R.view(value)).right();
      console.log(tok);

    }
  }
  else {
    console.log('NOPE');
  }

  return Either.Left('Functions not supported.');
}

function execute(fn : (any => any), stack : Token[]) : Either<string, Token>{
  // TODO: can we actually take a Token[] type? or does it need to be a maybe?
  // Also, can I refactor to make:
  // {stack : Token[], steps: Either<error, Token[]>} ?

}


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

/////////////// TESTS ////////////////////
const tokens : Token[] = [1, 2, 3].map((x : Literal) => inferType(x));
//console.log(tokens);

//const result : Either<string, Agg> = parse(tokens);
//console.log(result);
// console.log('JSON: ');
// console.log(JSON.stringify(result));

const tokens2 : Token[] = [1, 1, '+', ':'].map(inferType);
const result2 : Either<string, Agg> = parse(tokens2);
console.log(result2);
