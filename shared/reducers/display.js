// types are: "derived", "primitive", "none" (or null(?))

// or, built-in: true, false, null
// const initialState = {name: '', built_in: true};

function displayReducer(state = null, action) {
  switch (action.type) {
    case 'DISPLAY_FUNCTION': // (or display PRIMITIVE / BUILT-IN)
      return {name: action.name, built_in: true};
    case 'DISPLAY_DERIVED':
      return {name: action.name, built_in: false};
    // case 'CLEAR_DISPLAY' (optional)
    default:
      return state;
  }
}

module.exports = displayReducer;
