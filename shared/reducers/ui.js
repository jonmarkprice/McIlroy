const R = require('ramda'); // using append

// This should handle the following actions
// intial program state is empty list
const initialState = {
  program: [],
  buffer: []
};

const programLens = R.lensProp('program');
const bufferLens  = R.lensProp('buffer');

function uiReducer(state = intialState, action) {
  switch (action.type) {
    case 'PUSH_FUNCTION':
      return R.over(programLens, R.append(action.name), state);
    case 'CLEAR_CANVAS':
      return R.set(programLens, [], state);
    case 'BACKSPACE':
      return R.over(programLens, R.dropLast(1), state);
    case 'EDIT_ALIAS': // Open alias for editing
      const aliasUI = {
        editing: true,
        name: { editing: true, buffer: '' },
        expansion: [...state.program]
      };
      return R.over(bufferLens, R.append(aliasUI), state);
    default:
      return state;
  }
}

module.exports = uiReducer;
// const

function inputReducer(action = [], state) {
  switch (action.type) {
    case 'PUSH_INPUT':
      //
    case 'SELECT_INPUT':
      selected
    default:
      return state;
  }
}

module.exports = inputReducer;
