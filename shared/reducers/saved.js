const R = require('ramda');
const { dissoc, compose, set, over, lensProp } = R;
const { PROGRAM } = require('../actions/saved');

const initialState = {
  next_id: 0,
  programs: {}
};

const program = id => R.lensPath(['programs', id]);

function savedReducer(state = initialState, action) {
  let lens;

  // Needed?
  const nextSaveSlot = R.lensPath(['programs', state.next_id]);
  const uiIndex = R.lensProp('next_id');

  console.log(`In savedReducer...with ${action.type}`);
  switch (action.type) {
    // Saved (subreducer)
    case PROGRAM.ADD:
      // XXX: I don't like that we are using IDs here over maps...
      // what was the reasoning behind that?
      // I wanted to be able to delete... but not use an object as a map -- oh!
      // because the *name* is editable, so I needed a unique identifier, and it
      // couldn't be the name. But I also couldn't rely on indexes staying where
      // they were, so I needed to record the id in the data itself.

      // Actually, why not just use a simple list and append to it?
      // const nextId = R.lensPath(['saved', );
      return R.pipe(
        R.set(nextSaveSlot, {
          name: action.name,
          program : action.expansion,
          editing : false,
          buffer  : action.name,
          id      : state.next_id,
          editing_name: false
        }),
        R.over(uiIndex, R.inc)
      )(state);

    case PROGRAM.REMOVE:
      // remove a program from the GUI (after server complete)
      lens = lensProp('programs');
      return over(lens, dissoc(R.toString(action.id)), state);
    
    case PROGRAM.CREATE:
      console.log('Creating new program.');
      return R.pipe(
        R.set(nextSaveSlot, {
          name    : 'Untitled',
          program : action.program,
          editing : true,
          buffer  : 'Untitled',
          id      : state.next_id,
          editing_name: true
        }),
        R.over(uiIndex, R.inc)
      )(state);

    case PROGRAM.NAME.UPDATE:
      lens = compose(program(action.id), lensProp('name'));
      return set(lens, action.text, state);
  
    //case 'UPDATE_NAME_BUFFER':
    //  lens = compose(program(action.id), lensProp('buffer'));
    //  return set(lens, action.text, state);

    case PROGRAM.NAME.EDITING.SET:
      lens = compose(program(action.id), lensProp('editing_name'));
      return set(lens, true, state);

    case PROGRAM.NAME.EDITING.UNSET:
      lens = compose(program(action.id), lensProp('editing_name'));
      return set(lens, false, state);

    // Editing / Collapse state - using buffer[id].editing
    case PROGRAM.COLLAPSE:
      lens = compose(program(action.id), lensProp('editing'));  
      return set(lens, false, state);

    case PROGRAM.EXPAND:
      console.log(`In EXPAND...`);
      console.log(state)
      lens = compose(program(action.id), lensProp('editing'));

      const result = set(lens, true, state);
      console.log(result)
      return result;

    case PROGRAM.UI.DISABLE:
      console.log("Editing disabled.")
      return state;
    case PROGRAM.UI.ENABLE:
      console.log("Editing enabled.")
      return state;

    default:
      console.log(`In savedReducer. Reached default state on ${action.type}.`);
      return state;
  }
}

// This function handles the storing information that is synced with server.
// The shape is: {
//  <id>: {name: "...", program: [...]},
//  ...
// }
/* 
function savedReducer(state = {}, action) {
  switch (action.type) {
    // which actions
    case 'SET_SAVED_PROGRAM':
      // This should be the same for both adding and updating
      // action params: (id, name, program)
      return Object.assign({}, state, {
        [id]: {
          name: action.name,
          program: action.program
        }
      });
    case 'DELETE_SAVED_PROGRAM':
      // action params: (id)
      return dissoc(id, state);
    default:
      return state;
  }
} */

module.exports = savedReducer;
