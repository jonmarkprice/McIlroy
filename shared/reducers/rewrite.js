// const R = require('ramda');
const { combineReducers } = require('redux');
const uiReducer       = require('./ui');
const requestsReducer = require('./requests');
const programReducer  = require('./program');
const savedReducer    = require('./saved');

// intial state
/* const shape = { 
  buffer: { // SIMILAR TO **part of** "saved"
    // ALTERNATIVELY could be a list with a "hidden"/"open" boolean property
    <id> : { // PROBABLY DIFFERNET FROM saved's id
      editing : boolean,
      editing_name : boolean
      buffer : string
    } // see current state
  },
  requests: [{
    type : '', // 'edit' | 'delete' | 'create'),
    status : ''//('in-progress' | 'succeeded' | 'failed'),
    data : <any>,
    //id(?) : number (or string from mongodb _id)
  }],
  // other client-specific
  selected : integer, // (index) // which input is selected [TODO: combine?]
  displayed : string, // name of function displayed by Info
  input : [ ...{
    label : string,
    data : (null | [...<any>] )
  }],
  program : [...<any>], // or just [...string] // current program 
  saved: {
    <id>: { // database id
      name : string,
      program : [...<any>],
    }
  }
}*/

const rootReducer = combineReducers({
  ui: uiReducer,
  // add displayed, selected? // input // or miscReducers
  requests: requestsReducer,
  // program: programReducer,
  saved: savedReducer
});

module.exports = rootReducer;
