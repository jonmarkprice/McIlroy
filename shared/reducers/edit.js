const { EDIT } = require('../actions/edit');
const { set, lensProp, pipe } = require('ramda');

const dbg = console.log;

// if editing == false <-> id == null, mb. just check that id is null... 
const initialState = { editing: false, id: null };

function displayReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT.EDITING.SET:
      dbg(`Dispatching with id ${action.id}`)
      return pipe(
        set(lensProp('editing'), true),
        set(lensProp('id'), action.id)
      )(state);
    case EDIT.EDITING.UNSET:
      return pipe(
        set(lensProp('editing'), false),
        set(lensProp('id'), null) // not necessary but possibly useful
      )(state);
    default:
      console.log(`Reached default state on ${action.type}`);
      return state;
  }
}

module.exports = displayReducer;
