const { dissoc } = require('ramda');

// This function handles the storing information that is synced with server.
// The shape is: {
//  <id>: {name: "...", program: [...]},
//  ...
// }
function savedReducer(state = {}, action) {
  switch (action.type) {
    // which actions
    case 'SET_SAVED_PROGRAM':
      // This should be the same for both adding and updating
      // action params: (id, name, program)
      return Object.assign({}, state, {
        [id]: {
          name: action.name,
          program: action.program
        }
      });
    case 'DELETE_SAVED_PROGRAM':
      // action params: (id)
      return dissoc(id, state);
    default:
      return state;
  }
}

module.exports = savedReducer;
