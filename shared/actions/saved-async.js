// When I dispatch an action like 'SAVE_PROGRAM', esp. an async action
// I think it needs to take all of the data it needs as parameters, since
// I don't think they "get" anything from the reducers before being dispatched
// all the dispatches seem to happen here in the action-definitions themseles

const { 
  enableEditing
  , disableEditing 
  , removeProgram
} = require('./saved');

const base = "http://localhost:3000";
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

///////////////////////////////////////////////////////////////////////////////

function deleteSavedProgram(id, name) {
  console.log('-- DELETING PROGRAM --');
  return function(dispatch) {
    
    console.log(`Program name: "${name}"`);

    const payload = loadPost({user, name});
    dispatch(disableEditing(id));
    return fetch(`${base}/program/delete`, payload).then(
      value => { 
        console.log('-- DELETE COMPLETE --');
        dispatch(removeProgram(id));
      },
      error => {
        console.error(error);
        // TODO: display error?
        dispatch(enableEditing(id));
      }
    );
    //.then // opt.
  }
}

function saveProgram(id, name, expansion) {
  console.log('-- SAVING PROGRAM --');
  return function(dispatch) {
    dispatch(disableEditing(id));
    const payload = loadPost({user, name, expansion});
    return fetch(`${base}/program/save`, payload).then(
        value => {
          console.log('-- POST COMPLETE --');
          dispatch(enableEditing(id));
        },
        error => {
          console.error(error);
        }
      )
  }
}

function updateNameOnServer(id, oldName, newName) {
  console.log('-- UPDATING NAME --');
  return function (dispatch) {
    dispatch(disableEditing(id));
    const payload = loadPost({user, oldName, newName});
    return fetch(`${base}/program/rename`, payload).then(
      value => {
        console.log('-- RENAME COMPLETE --');
        dispatch(enableEditing(id));
      },
      error => {
        console.log(error);
      }
    );
  }
}

module.exports = {
  saveProgram
  , deleteSavedProgram
  , updateNameOnServer
};