const PUSH_INPUT = 'PUSH_INPUT';
const pushInput = input =>
({type: PUSH_INPUT, input});

const SELECT_INPUT = 'SELECT_INPUT';
const selectInput = index =>
({type: SELECT_INPUT, index});

module.exports = {
  PUSH_INPUT, pushInput,
  SELECT_INPUT, selectInput
};