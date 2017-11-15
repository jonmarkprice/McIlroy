// @flow
import type { Token, Literal } from './parse';
import type { Either } from './lib/either';

const R = require('ramda');
const { Left, Right } = require('./lib/either');
const { parseStack, tokenize } = require('./parse.js');
const syntax = require('./syntax');
const primitives = require('./functions');

// After testing, rename to just 'run'
function result(...program : Literal[]) : Either<?Token> {
  const tokens = program.map(x => tokenize(x, {syntax, primitives}));
  const acc = parseStack(tokens, [], true, 0);
  //return Left.of('Unimplemented');
  const stack : Either<?Token[]> = acc.map(R.prop('stack'));
  if (R.equals(stack.map(R.length), Right.of(1))) {
    return stack.map(R.head).map(R.prop('value'));
  }
  else {
    return Left.of('Too many items on stack.');
  }
}

module.exports = { result };