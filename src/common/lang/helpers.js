// @flow
import type { Token, Literal } from './parse';
import type { Either } from './lib/either';

const R = require('ramda');
const S = require('sanctuary');
const { Left, Right } = S;
const { parseStack, tokenize } = require('./parse.js');
const syntax = require('./syntax');
const primitives = require('./functions');

function result(...program : Literal[]) : Either<?Token> {
  const tokens = program.map(x => tokenize(x, {syntax, primitives}));
  const acc = parseStack(tokens, Right([]), true, 0);
  if (S.equals(S.pluck('length', acc.stack), Right(1))) {
    return S.pipe([S.map(R.head), S.pluck('value')], acc.stack);
  }
  else {
    return Left('Too many items on stack.');
  }
}

module.exports = { result };

