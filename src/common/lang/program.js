const S = require('sanctuary');
const { Right, Left} = S;
const R = require('ramda');
const { parseStack, print } = require('./parse');
const { tokenize_ } = require('./tokenize');

function parseProgram(program) {
  const tokens = program.map(tokenize_);
  const init = {
    stack: Right([]),
    first: true,
    index: 0
  };
  const acc = parseStack(tokens, init); 
  const steps = createSteps(tokens, acc);
  return {stack: acc.stack, steps};
}

function createSteps(tokens, acc) {
  const input  = S.map(print, tokens);
  const steps  = acc.steps.map(({snapshot, consumed}) => {
    const leftover = input.length - consumed;    
    return S.concat(snapshot, R.takeLast(leftover, input))
  }); 
  return S.prepend(input, steps); // prepend input step
}

module.exports = { parseProgram, createSteps };
