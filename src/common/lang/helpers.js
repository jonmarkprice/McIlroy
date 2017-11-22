// @flow
import type { Token, Literal } from './parse';
import type { Either } from './lib/either';

const R = require('ramda');
const S = require('sanctuary');
const { Left, Right } = S;
const { parseStack } = require('./parse.js');
const { tokenize_ } = require('./tokenize');

function result(...program : Literal[]) : Either<?Token> {
  const tokens = program.map(tokenize_);
  const acc = parseStack(tokens, Right([]), true, 0);
  if (S.equals(S.pluck('length', acc.stack), Right(1))) {
    return S.map(R.head, acc.stack);
  }
  else {
    console.log(acc.stack);

    return Left('Too many items on stack.');
  }
}

module.exports = { result };

