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
  saved     : {name: 'Untitled', program: []},

  // TODO Later use Map/obj for buffer: {<fn>: <buffer value>, ...}
  buffer    : '',
  editing_name : false
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
      console.log('recieved SAVE PROGRAM.')
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {program: state.program})
      });
    case 'NAME_PROGRAM':
      console.log(`naming program ${state.buffer}`)
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {
          name: state.buffer,
        }),
        buffer: '',
        editing_name: false
      });
    case 'UPDATE_NAME_BUFFER':
      return Object.assign({}, state, {
        buffer: action.text
      });
    case 'EDIT_NAME':
      console.log('editing name...');
      return Object.assign({}, state, {
        editing_name: true
      });
    default: return state
  }
}

export default app;
