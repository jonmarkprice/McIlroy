const { EDIT } = require('../actions/edit');
const { set, over, lensProp, pipe, dropLast, append } = require('ramda');
const dbg = require('../../src/common/dbgconf')('reducers:edit');

// if editing == false <-> id == null, mb. just check that id is null... 
const initialState = {
  editing: false
, id: null
, name: ''
, program: []
, saved: null // will be true/false
, message: ''
};

function displayReducer(state = initialState, action) {
  const lens = {
    editing : lensProp('editing'),
    id      : lensProp('id'),
    name    : lensProp('name'),
    program : lensProp('program'),
    saved   : lensProp('saved'),
    message : lensProp('message')
  };
  switch (action.type) {
    case EDIT.EDITING.SET:
      dbg(`Dispatching with id ${action.id}`)
      return pipe(
        set(lens.editing, true),
        set(lens.id, action.id),
        set(lens.program, action.program),
        set(lens.name, action.name),
        set(lens.saved, true),
        set(lens.message, '')
      )(state);
    case EDIT.EDITING.UNSET:
      return pipe(
        set(lens.editing, false),
        set(lens.id, null), // not necessary but possibly useful
        set(lens.message, '')
      )(state);
    case EDIT.EDITING.NEW:
      return pipe(
        set(lens.editing, true),
        set(lens.id, action.id),
        set(lens.name, ''),
        set(lens.program, action.program),
        set(lens.saved, false),
        set(lens.message, '')
      )(state);
    case EDIT.PROGRAM.CLEAR:
      return set(lens.program, [], state);
    case EDIT.PROGRAM.BACKSPACE:
      return over(lens.program, dropLast(1), state);
    case EDIT.PROGRAM.PUSH:
      return over(lens.program, append(action.token), state);
    case EDIT.MESSAGE.DISPLAY:
      return set(lens.message, action.message, state);
    default:
      dbg(`Reached default state on ${action.type}`);
      return state;
  }
}

module.exports = displayReducer;
