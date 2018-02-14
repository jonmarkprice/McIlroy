const { createOpts } = require('./helpers/misc');
const { removeProgram } = require('../saved');
const dbg = require("../../dbgconf")("async-actions:delete-program");

const deleteProgram = (username, id, name, stage) => dispatch => {
  const body = { user: username, name };
  const path = '/' + stage + '/program/delete';

  fetch(path, createOpts(body, "mocked"))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      dbg('Response: %s', parsed.message);
      dispatch(removeProgram(id)); 
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

module.exports = deleteProgram;
