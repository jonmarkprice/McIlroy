// import { combineReducers } from 'redux' // Not using currently
import { append } from 'ramda';

// In order to do SSR, we need pass our state as JSON. JSON doesn't have a
// Map, so I need to either transform my Map into a list of pairs, or use a
// plain object instead.
// Transforming to and from a list of pairs can be accomplished using the
// spread operator, e.g. [...map] and Map's constructor, e.g. new Map(pairs).
// However, I would need to know which (properties) to transform, so this may
// be problematic.
const initialState = {
  input     : [{label: '[No Input]', data: null}],
  selected  : 0,
  program   : [],
  displayed : '',
  saved     : {},
  next_id   : 0
}


// XXX Many of these are ugly!! Consider just making one copy, mutating, then returning.
function reducer(state = initialState, action) {
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
      // XXX This is ugly!! Consider just making one copy, mutating, then returning.
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
    default:
      return state
  }
}

export default reducer;
