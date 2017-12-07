function displayReducer(state = '', action) {
  switch (action.type) {
    case 'DISPLAY_FUNCTION':
      return action.name;
    default:
      return state;
  }
}

module.exports = displayReducer;
