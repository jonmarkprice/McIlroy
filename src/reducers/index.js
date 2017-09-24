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
  saved     : {name: '', program: []}
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
        // mabye try to use an actual map later on...
        saved: {name: action.name, program: state.program}
      });
    case 'NAME_PROGRAM':
      return Object.assign({}, state, {
        saved: Object.assign({}, state.saved, {name: action.name})
      });
    default: return state
  }
}

export default app;
