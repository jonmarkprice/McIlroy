const { createOpts } = require('./helpers/misc');
const dbg = require("../../dbgconf")("async-actions:save-program");

const saveProgram = (username, name, expansion, stage) => dispatch => {
  const body = { user: username, name, expansion };
  const path = '/' + stage + '/program/save';

  dispatch({type: 'SET_FLASH', message: 'Saving program...'});

  fetch(path, createOpts(body, "mocked"))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      dbg('Response: %s', parsed.message); 
      dispatch({type: 'CLEAR_FLASH'});
    },
    err => {
      console.error(err);
      dispatch({
        type: 'SET_FLASH',
        message: err.message || 'Unknown error'
      });
    }
  );
}

module.exports = saveProgram;
