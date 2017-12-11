const { EDIT } = require('../actions/edit');
const { set, lensProp } = require('ramda');

const initialState = { editing: true };

function displayReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT.EDITING.SET:
      return set(lensProp('editing'), true, state);
    case EDIT.EDITING.UNSET:
      return set(lensProp('editing'), false, state);
    default:
      return state;
  }
}

module.exports = displayReducer;
