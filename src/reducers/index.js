// import { combineReducers } from 'redux' // Not using currently
// Reducers
import { append } from 'rambda';

// const boundPushFunction = name => dispatch(pushFunction(name));
// function PopFunction()

const initialState = {
  input     : [{label: '[No Input]', data: null}],
  selected  : 0,
  program   : []
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
    case 'SELECT_INPUT':
      return Object.assign({}, state, {
        selected: action.index
      })
    default: return state
  }
}

export default app;
