// import { combineReducers } from 'redux'

// Import reducers
const inputReducer    = require('./input');
const programReducer  = require('./canvas');
const displayReducer  = require('./display');
const savedReducer    = require('./saved');
// TDB: requestReducer

function reducer(state, action) {
  console.log(`Reducer: got action: ${action.type}`)
  return {
    input     : inputReducer(state.input, action),
    program   : programReducer(state.program, action),
    displayed : displayReducer(state.displayed, action),
    saved     : savedReducer(state.saved, action)
  };
}

module.exports = reducer; // rootReducer
