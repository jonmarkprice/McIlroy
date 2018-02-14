const { createOpts } = require('./helpers/misc');
const dbg = require("../../dbgconf")("async-actions:update-program");

function updateProgramOnServer(username, id, oldName, newName, newProgram,
                               stage) {
  return function (dispatch) {
    // const username = getUser().username;
    const old = {
      user: username,
      name: oldName
    };
    const updated = {
      user: username,
      name: newName,
      expansion: newProgram
    };
    const deletePath = `/${stage}/program/delete`;
    const savePath = `/${stage}/program/save`;

    dispatch({type: 'SET_FLASH', message: 'Updating program...'});

    fetch(deletePath, createOpts(old, "mocked"))
    .then(res => res.json())
    .then(parsed => {
      dbg('Delete response: %s', parsed.message);
      return fetch(savePath, createOpts(updated, "mocked"));
    })
    .then(res => res.json())
    .then( // Two parameter version handles both success & failure.
      parsed => {
        dbg('Save response: %s', parsed.message);
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
}

module.exports = updateProgramOnServer;
