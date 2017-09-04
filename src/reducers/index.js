// import { combineReducers } from 'redux' // Not using currently
// Reducers

// const boundPushFunction = name => dispatch(pushFunction(name));
// function PopFunction()

const initialState = {
  input: ['hello'],
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
    default: return state
  }
}

export default app;
