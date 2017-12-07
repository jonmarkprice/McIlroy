const { append } = require('ramda');

// Program canvas
function programCanvasReducer(state = [], action) {
  switch (action.type) {
    case 'PUSH_FUNCTION':
      return append(action.name, state);

    case 'CLEAR_CANVAS':
      return [];
    
    case 'BACKSPACE':
      return state.slice(0, -1);

    default:
      return state;
  }
}

module.exports = programCanvasReducer;
