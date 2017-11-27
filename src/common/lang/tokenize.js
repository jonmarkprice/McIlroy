// @flow
// The new parser, called just "parse"
const R = require('ramda');
const S = require('sanctuary');
const { Left, Right } = S;
const { last, dropLast, takeLast, gets } = require('./lib/sanctuary-either');
const { wrap, unwrap } = require('./type');
const display = require('./display'); 

const { interpretTypes } = require('./typecheck');
const library = require('./library');

const syntax = require('./syntax');
const primitives = require('./functions');

import type { Type, TokenType } from './typecheck';

//type Alias   = {type: string, expansion: Array<Literal | Alias>}; // recursive types ok?
export type AliasLiteral = {name: string, expansion: Token[]};
export type Literal = string | number | boolean;
export type Token = SyntaxToken | AliasToken | ValueToken;
export type SyntaxToken = {token: 'Syntax', value: string};
export type AliasToken = {token: 'Alias', value: AliasLiteral};
export type ValueToken = {token: 'Value', type: {name: 'Boolean'}, value: boolean} 
  | {token: 'Value', type: {name: 'Number'}, value: number}
  | {token: 'Value', type: {name: 'Char'}, value: string}
  | {token: 'Value', type: {name: 'List'}, value: Literal[]}
  | {token: 'Value', type: {name: 'Function'}, value: string};

// TODO: potentially make function / alias sub-types

export type TokenizerConfig = {
  syntax: Set<string>,
  primitives: Set<string>
};

// TODO: Need steps
type Accumulator = Either<{
  stack : Token[],
  first : boolean,
  index : number
}>;

// NOTE: This funtion is intended to be mapped over.
// Assume there can't be any lists, only cons or list literals '[', ']'
// TODO: consider wrapping this Token in an Either
function tokenize(value : Literal | AliasLiteral, config : TokenizerConfig) : Token
{
  if (value.name !== undefined && value.expansion !== undefined) {
    // Any object that has 'name' and 'expansion' fields is considered to
    // be an alias.
    return {token: 'Alias', value};
    //return {token: 'Value', type: {name: 'List'}, value: []}; // TEST
  }
  // Check strings
  else if (typeof value == 'string') {
    if (config.syntax.has(value)) {
      // We could also use a Map or Set to define syntax and use .has()
      return {token: 'Syntax', value};
    }
    else if (config.primitives.has(value)) {
      return {
        token: 'Value',
        type: {name: 'Function'/* Eventually support from, to fields */},
        value: library.get(value)
      };
    }
    else if (value.length === 1) {
      return {token: 'Value', type: {name: 'Char'}, value};
    }
    else {
      throw Error(`Arbitrary strings not supported. Got "${value}".`);
    }
  }
  else if (typeof value == 'boolean') {
    return {token: 'Value', type: {name: 'Boolean'}, value};
  }
  else if (typeof value == 'number') {
    return {token: 'Value', type: {name: 'Number'}, value};
  }
  else if (Array.isArray(value)) {
    return {
      token: 'Value',
      type: {name: 'List'},
      value: value.map(x => tokenize(x, config))
    };
  }
  else {
    // Throw an error if not. This should never ever happen.
    throw Error('Invalid token!');
  }
}

// Bake a the full syntax, primitive library
const tokenize_ = x => tokenize(x, {syntax, primitives});

module.exports = { tokenize, tokenize_ };
