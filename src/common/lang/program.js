const S = require('sanctuary');
const { Right, Left} = S;
const R = require('ramda');
const { parseStack, print, createSteps } = require('./parse');
// const { tokenize_ } = require('./tokenize');

function parseProgram(program) {
  const tokens = program.map(tokenize_);
  const init = {
    stack: Right([]),
    first: true,
    index: 0
  };
  let firstStep = S.map(print, tokens);
  let acc   = {};
  try {
    acc = parseStack(tokens, init);
  }
  catch (err) {
    // NOTE: Eventually, I would like to create steps even if there is an
    // error, but don't worry about that for now.
    let steps = [];
    if (!R.isNil(acc) && R.has('steps', acc)) {
      steps = S.prepend(firstStep, createSteps(tokens, acc.steps));
    }
    return {stack: Left(err), steps};
  }
  const steps = S.prepend(firstStep, createSteps(tokens, acc.steps));
  return {stack: acc.stack, steps};
}

module.exports = { parseProgram  };
