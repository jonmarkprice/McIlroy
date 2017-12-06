// import { combineReducers } from 'redux' // Not using currently
const R = require('ramda');
const { append } = R; 

// In order to do SSR, we need pass our state as JSON. JSON doesn't have a
// Map, so I need to either transform my Map into a list of pairs, or use a
// plain object instead.
// Transforming to and from a list of pairs can be accomplished using the
// spread operator, e.g. [...map] and Map's constructor, e.g. new Map(pairs).
// However, I would need to know which (properties) to transform, so this may
// XXX Many of these are ugly!! Consider just making one copy, mutating, then returning.
function reducer(state, action) {
  switch (action.type) {
    case 'PUSH_FUNCTION':
      return Object.assign({}, state, {
        program: append(action.name, state.program)
      });
    case 'PUSH_INPUT':
      return Object.assign({}, state, {
        input: state.input.concat(action.input)
      });
    case 'CLEAR_CANVAS':
      return Object.assign({}, state, {
        program: []
      });
    case 'BACKSPACE':
      return Object.assign({}, state, {
        program: state.program.slice(0, -1)
      });
    case 'SELECT_INPUT':
      return Object.assign({}, state, {
        selected: action.index
      });
    case 'DISPLAY_FUNCTION':
      return Object.assign({}, state, {
        displayed: action.name
      });
    case 'SAVE_ALIAS': 
      // XXX: I don't like that we are using IDs here over maps...
      // what was the reasoning behind that?
      // I wanted to be able to delete... but not use an object as a map -- oh!
      // because the *name* is editable, so I needed a unique identifier, and it
      // couldn't be the name. But I also couldn't rely on indexes staying where
      // they were, so I needed to record the id in the data itself.

      // Actually, why not just use a simple list and append to it?
      // const nextId = R.lensPath(['saved', );
      const nextSaveSlot = R.lensPath(['saved', state.next_id]);
      return R.pipe(
        R.set(nextSaveSlot, {
          name: action.name,
          program : action.expansion,
          editing : false,
          buffer  : action.name,
          id      : state.next_id,
          editing_name: false
        }),
        R.over(R.lensProp('next_id'), R.inc)
      )(state);
    case 'SAVE_PROGRAM': // Saves a new program.
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [state.next_id]: Object.assign({}, state.saved[state.next_id], {
            name    : 'Untitled',
            program : state.program,
            editing : true,
            buffer  : 'Untitled',
            id      : state.next_id,
            editing_name: true
          })
        }),
        next_id: state.next_id + 1,
      });
    case 'NAME_PROGRAM':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [action.id]: Object.assign({}, state.saved[action.id], {
            name          : state.saved[action.id].buffer,
            editing_name  : false
          })
        })
      });
    case 'UPDATE_NAME_BUFFER':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [action.id]: Object.assign({}, state.saved[action.id], {
            buffer: action.text
          })
        })
      });
    case 'EDIT_NAME':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [action.id]: Object.assign({}, state.saved[action.id], {
            editing_name: true
          })
        })
      });
    case 'EXPAND_SAVED_PROGRAM':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [action.id]: Object.assign({}, state.saved[action.id], {
            editing: true
          })
        })
      });
    case 'COLLAPSE_SAVED_PROGRAM':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          [action.id]: Object.assign({}, state.saved[action.id], {
            editing: false
          })
        })
      });
    case 'POST_ALIAS':
      return state; // XXX Not sure if I need to do anything here.
    case 'SAVED_ALIAS':
      return Object.assign({}, state, {
        save_ok: 'YES' // DEPRECATED
      });
    default:
      return state
  }
}

module.exports = reducer;
