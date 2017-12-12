const { EDIT } = require('../actions/edit');
const { set, lensProp, pipe } = require('ramda');

const dbg = console.log;

// if editing == false <-> id == null, mb. just check that id is null... 
const initialState = {
  editing: false,
  id: null,
  name: '',
  program: [],
  saved: null // will be true/false
};

function displayReducer(state = initialState, action) {
  const lens = {
    editing : lensProp('editing'),
    id      : lensProp('id'),
    name    : lensProp('name'),
    program : lensProp('program'),
    saved   : lensProp('saved')
  };
  switch (action.type) {
    case EDIT.EDITING.SET:
      dbg(`Dispatching with id ${action.id}`)
      return pipe(
        set(lens.editing, true),
        set(lens.id, action.id),
        set(lens.program, action.program),
        set(lens.name, action.name),
        set(lens.saved, true)
      )(state);
    case EDIT.EDITING.UNSET:
      return pipe(
        set(lens.editing, false),
        set(lens.id, null) // not necessary but possibly useful
      )(state);
    case EDIT.EDITING.NEW:
      return {
        editing: true,
        id: action.id,
        name: '',       // may want to explicitly clear
        program: action.program,
        saved: false
      };
    default:
      console.log(`Reached default state on ${action.type}`);
      return state;
  }
}

module.exports = displayReducer;
