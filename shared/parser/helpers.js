// import type { Token, Literal } from './parse';
// import type { Either } from './lib/either';

const R = require('ramda');
const S = require('sanctuary');
const { Left, Right } = S;
const { parseStack } = require('./parse');
const { parseProgram } = require('./program');
const { tokenize_ } = require('./tokenize');

/**
 * @param {Literal[]} program
 */
function result(...program) {
  const tokens = program.map(tokenize_);
  const init = {
    stack: Right([]),
    first: true,
    index: 0
  };
  const acc = parseStack(tokens, init);
  if (S.equals(S.pluck('length', acc.stack), Right(1))) {
    return S.map(R.head, acc.stack);
  }
  else {
    console.log(acc.stack);

    return Left('Too many items on stack.');
  }
}

module.exports = { result };

