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
  //let steps = [];
  let acc   = {};
  try {
    acc = parseStack(tokens, init);
  }
  catch (err) {
    // NOTE: Eventually, I would like to create steps even if there is an
    // error, but don't worry about that for now.
    let steps = [];
    if (!R.isNil(acc) && R.has('steps', acc)) {
      steps = createSteps(tokens, acc.steps);
    }
    return {stack: Left(err), steps};
  }
  return {stack: acc.stack, steps: createSteps(tokens, acc.steps)};
}

function createSteps(tokens, steps) {
  const input = S.map(print, tokens);
  const fullSteps = steps.map(({snapshot, consumed}) => {
    const leftover = input.length - consumed;    
    return S.concat(snapshot, R.takeLast(leftover, input))
  });
  return S.prepend(input, fullSteps); // prepend input step
}

module.exports = { parseProgram, createSteps };
