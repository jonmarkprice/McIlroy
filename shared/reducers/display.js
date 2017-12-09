const { DISPLAY } = require('../actions/display');

function displayReducer(state = null, action) {
  switch (action.type) {
    case DISPLAY.PRIMITIVE:
      console.log("-- DISPLAYING PRIMITIVE --")
      return {
        name: action.name,
        built_in: true,
        id: null
      };
    case DISPLAY.DERIVED:
      console.log("-- DISPLAYING derived --") 
      return {
        name: action.name,
        built_in: false,
        id: action.id
      };
    default:
      return state;
  }
}

module.exports = displayReducer;