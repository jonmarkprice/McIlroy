// import { combineReducers } from 'redux' // Not using currently
// Reducers

// const boundPushFunction = name => dispatch(pushFunction(name));
// function PopFunction()

const initialState = {
  input: ['[No Input]'],
  program: []
}
/*
export const pushFunction = (state, action.name) =>
  Object.assign({}, state, {
    program: state.program.concat(action.name)
  });
*/

function app(state = initialState, action) {
  switch (action.type) {
    case 'PUSH_FUNCTION':
      return Object.assign({}, state, {
        program: state.program.concat(action.name)
      });
    case 'PUSH_INPUT':
      return Object.assign({}, state, {
        input: state.input.concat(action.name)
      });
    case 'CLEAR_CANVAS':
      return Object.assign({}, state, {
        program: []
      });
    default: return state
  }
}

export default app;
