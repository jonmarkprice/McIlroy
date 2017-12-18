const {set, over, lensProp, append} = require('ramda');

const initialState = {
  selected: 0,
  list: [{label: '[No Input]', data: null}]
};

function inputReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUSH_INPUT':
      return over(lensProp('list'), append(action.input), state);
    
    case 'SELECT_INPUT':
      return set(lensProp('selected'), action.index, state);

    default:
      return state;
  }
}

module.exports = inputReducer;
