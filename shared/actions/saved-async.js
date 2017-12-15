// When I dispatch an action like 'SAVE_PROGRAM', esp. an async action
// I think it needs to take all of the data it needs as parameters, since
// I don't think they "get" anything from the reducers before being dispatched
// all the dispatches seem to happen here in the action-definitions themseles
const dbg = require('../../src/common/dbgconf')('actions:saved-async'); 
const { 
  enableEditing
  , disableEditing 
  , removeProgram
} = require('./saved');
const base = "http://localhost:3000/api";
const user = "test";

const loadPost = (data) => ({
  method  : 'POST',
  headers : new Headers({
    'Content-Type': 'application/json'
  }),
  mode    : 'cors', 
  cache   : 'default',
  body    : JSON.stringify(data)
});

function deleteSavedProgram(id, name) {
  dbg('-- DELETING PROGRAM --');
  return function(dispatch) {
    
    dbg(`Program name: "${name}"`);

    const payload = loadPost({user, name});
    dispatch(disableEditing(id));
    return fetch(`${base}/program/delete`, payload).then(
      value => { 
        dbg('-- DELETE COMPLETE --');
        dispatch(removeProgram(id));
      },
      error => {
        dbg(error);
        // TODO: display error?
        dispatch(enableEditing(id));
      }
    );
    //.then // opt.
  }
}

function saveProgram(name, expansion) {
  dbg('-- SAVING PROGRAM --');
  return function(dispatch) {
    // dispatch(disableEditing(id));
    const payload = loadPost({user, name, expansion});
    return fetch(`${base}/program/save`, payload).then(
      value => {
        dbg('-- POST COMPLETE --');
       //  dispatch(enableEditing(id));
      },
      error => {
        dbg(error);
      }
    );
  }
}

function updateProgramOnServer(id, oldName, newName, newProgram) {
  dbg('-- UPDATING NAME --');
  return function (dispatch) {
    dispatch(disableEditing(id));
    dbg('Saving with new program: %o', newProgram);
    const payload = loadPost({user, oldName, newName, newProgram});
    return fetch(`${base}/program/edit`, payload).then(
      value => {
        dbg('-- RENAME COMPLETE --');
        dispatch(enableEditing(id));
      },
      error => {
        dbg(error);
      }
    );
  }
}

module.exports = {
  saveProgram
  , deleteSavedProgram
  , updateProgramOnServer
};
