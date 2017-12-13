const { pluck, values, equals } = require('ramda');
const { literals, functions } = require('./parser/syntax.js');

function checkName(name, programs) {
  // check against names in
  // 1. functions, primitives, syntax (see parser/syntax.js)
  // 2. other saved functions
  // 3. integers, quotes, lists, etc.

  // check if it is a valid number
  //or just check that it matches a 
  if (! /^[A-Za-z_]\w*$/.test(name)) {
    return {ok: false, reason: 'Invalid identifier string.'};
  }
  else if (literals.has(name) || functions.has(name)) {
    return {
      ok: false,
      reason: 'Identifier cannot be a literal or reserved word.'
    };
  }
  else if (pluck('name', values(programs)).some(equals(name))) {
    return {
      ok: false,
      reason: 'Identifier is the same as an existing derived program.'
    };
  }
  return {ok: true, reason: ''};
}

module.exports = { checkName };
