const { combineReducers } = require('redux');
const inputReducer    = require('./input');
const programReducer  = require('./canvas');
const displayReducer  = require('./display');
const savedReducer    = require('./saved');
const editReducer     = require('./edit');
// TDB: requestReducer

const reducer = combineReducers({
  input     : inputReducer,
  program   : programReducer,
  displayed : displayReducer,
  saved     : savedReducer,
  edit      : editReducer,
});

module.exports = reducer;
