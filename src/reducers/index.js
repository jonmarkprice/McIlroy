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
  last_id   : 0
}

function app(state = initialState, action) {
  switch (action.type) {
    case 'PUSH_FUNCTION':
      return Object.assign({}, state, {
        program: append(action.name, state.program) //state.program.concat(action.name)
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
    case 'SAVE_PROGRAM':
      // Saves a new program.
      console.log('recieved SAVE PROGRAM.')
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(state.last_id + 1, {
          name    : 'Untitled',
          program : state.program,
          editing : false,
          buffer  : '',
          id      : state.last_id + 1
        }),
        last_id: state.last_id + 1,
      });
    case 'NAME_PROGRAM':
      console.log(`naming program ${state.saved.buffer}`)
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign(
            {},
            state.saved.get(action.id),
            {name: state.saved.get(action.id).buffer, editing : false}
          )
        )
      });
    case 'UPDATE_NAME_BUFFER':
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign(
            {},
            state.saved.get(action.id),
            {buffer: action.text}
          )
        )
      });
    case 'EDIT_NAME':
      console.log('editing name...');
      return Object.assign({}, state, {
        saved: new Map(state.saved).set(action.id,
          Object.assign({}, state.saved.get(action.id), {
            editing: true
          })
        )
      });
    default: return state
  }
}

export default app;
