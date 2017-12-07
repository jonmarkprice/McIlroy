// import { combineReducers } from 'redux' // Not using currently
const R = require('ramda');
const { append, set, over, lensProp, lensPath, compose } = R;
const {
  ADD_PROGRAM
, NEW_PROGRAM
} = require('../actions');

// In order to do SSR, we need pass our state as JSON. JSON doesn't have a
// Map, so I need to either transform my Map into a list of pairs, or use a
// plain object instead.
// Transforming to and from a list of pairs can be accomplished using the
// spread operator, e.g. [...map] and Map's constructor, e.g. new Map(pairs).
// However, I would need to know which (properties) to transform, so this may
// XXX Many of these are ugly!! Consider just making one copy, mutating, then returning.
function reducer(state, action) {
  // Lenses:
  const inputList = R.lensPath(['input', 'list']);
  const selected  = R.lensPath(['input', 'selected']);
  const nextSaveSlot = R.lensPath(['saved', 'programs', state.saved.next_id]);
  const uiIndex = R.lensPath(['saved', 'next_id']);


  const program = id => R.lensPath(['saved', 'programs', id]);
  let lens;

  console.log(`Reducer: got action: ${action.type}`)

  switch (action.type) {
     // Input (subreducer)
    case 'PUSH_INPUT':
      return over(inputList, append(action.input), state);

    case 'SELECT_INPUT':
      return set(selected, action.index, state);

    // Program canvas (subreducer)
    case 'PUSH_FUNCTION':
      return Object.assign({}, state, {
        program: append(action.name, state.program)
      });

    case 'CLEAR_CANVAS':
      return Object.assign({}, state, {
        program: []
      });
    
    case 'BACKSPACE':
      return Object.assign({}, state, {
        program: state.program.slice(0, -1)
      });

    // Display (subreducer)
    case 'DISPLAY_FUNCTION':
      return Object.assign({}, state, {
        displayed: action.name
      });

    // Saved (subreducer)
    case ADD_PROGRAM: 
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
          id      : state.saved.next_id,
          editing_name: false
        }),
        R.over(uiIndex, R.inc)
      )(state);

    case NEW_PROGRAM:
      return R.pipe(
        R.set(nextSaveSlot, {
          name    : 'Untitled',
          program : action.program,
          editing : true,
          buffer  : 'Untitled',
          id      : state.saved.next_id,
          editing_name: true
        }),
        R.over(uiIndex, R.inc)
      )(state);

    case 'NAME_PROGRAM':
      // Update both editing state and buffer itself
      lens = program(action.id);
      return R.pipe(
        set(compose(lens, lensProp('editing_name')), false),
        set(compose(lens, lensProp('name')), state.saved.programs[action.id].buffer)
      )(state);
  
    case 'UPDATE_NAME_BUFFER':
      lens = compose(program(action.id), lensProp('buffer'));
      return set(lens, action.text, state);

    case 'EDIT_NAME':
      lens = compose(program(action.id), lensProp('editing_name'));
      return set(lens, true, state);

    // Editing / Collapse state - using buffer[id].editing
    case 'COLLAPSE_SAVED_PROGRAM':
      lens = compose(program(action.id), lensProp('editing'));  
      return set(lens, false, state);

    case 'EXPAND_SAVED_PROGRAM':
      lens = compose(program(action.id), lensProp('editing'));
      return set(lens, true, state);

    // case 'POST_ALIAS':
    // return state; // XXX Not sure if I need to do anything here.
    case 'SAVED_ALIAS':
      return Object.assign({}, state, {
        save_ok: 'YES' // DEPRECATED
      });

    default:
      console.log(`Reached default state on ${action.type}`)
      return state
  }
}

module.exports = reducer;
