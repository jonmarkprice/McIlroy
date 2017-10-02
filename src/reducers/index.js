// import { combineReducers } from 'redux' // Not using currently
// Reducers
import { append } from 'ramda';

// const boundPushFunction = name => dispatch(pushFunction(name));
// function PopFunction()

const initialState = {
  input     : [{label: '[No Input]', data: null}],
  selected  : 0,
  program   : [],
  displayed : '',
  saved     : new Map(),
  next_id   : 0
}

function app(state = initialState, action) {
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
        saved: new Map(state.saved).set(state.next_id, {
          name    : 'Untitled',
          program : state.program,
          editing : true,
          buffer  : 'Untitled',
          id      : state.next_id,
          editing_name: true
        }),
        next_id: state.next_id + 1,
      });
    case 'NAME_PROGRAM':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            name    : state.saved.get(action.id).buffer,
            editing_name : false
          })
        )
      });
    case 'UPDATE_NAME_BUFFER':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            buffer: action.text
          })
        )
      });
    case 'EDIT_NAME':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            editing_name: true
          })
        )
      });
    case 'EXPAND_SAVED_PROGRAM':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            editing: true
          })
        )
      });
    case 'COLLAPSE_SAVED_PROGRAM':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            editing: false
          })
        )
      });
    default:
      return state
  }
}

export default app;
