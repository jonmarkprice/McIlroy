const { USER } = require('../actions/user');

const initialState = {
  name: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.LOGIN:
      return {name: action.username};
    case USER.LOGOUT:
      return {name: null};
    default:
      return state;
  }
}

module.exports = userReducer;
