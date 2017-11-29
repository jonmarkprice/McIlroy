const S = require('sanctuary');
const R = require('ramda');
const { interpretTypes } = require('./typecheck');

const addTypes = S.curry3((tokenList, annotation, result) => {
  const token = S.map(R.assoc('token', 'Value'), result); 
  const type  = S.join(S.lift3(interpretTypes, tokenList, annotation, result));
  return S.lift2(R.assoc('type'), type, token);
});

module.exports = { addTypes };
