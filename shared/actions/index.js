// Action Creators
const pushFunction = name =>
  ({ type: 'PUSH_FUNCTION', name });
const clearCanvas = () =>
  ({type: 'CLEAR_CANVAS'});
const popFromCanvas = () =>
  ({type: 'BACKSPACE'});
const pushInput = input =>
  ({type: 'PUSH_INPUT', input});
const selectInput = index =>
  ({type: 'SELECT_INPUT', index});
const displayFunction = name =>
  ({type: 'DISPLAY_FUNCTION', name});
const addProgram = () =>
  ({type: 'SAVE_PROGRAM'});
const updateProgramName = id =>
  ({type: 'NAME_PROGRAM', id});
const updateProgramNameBuffer = (id, text) =>
  ({type: 'UPDATE_NAME_BUFFER', id, text});
const editName = id =>
  ({type: 'EDIT_NAME', id});
const expandSavedProgram = id =>
  ({type: 'EXPAND_SAVED_PROGRAM', id});
const collapseProgram = id =>
  ({type: 'COLLAPSE_SAVED_PROGRAM', id})
const saveAlias = (name, expansion) =>
  ({type: 'SAVE_ALIAS', name, expansion});
const savedAlias = () =>
  ({type: 'SAVED_ALIAS'});

// When I dispatch an action like 'SAVE_PROGRAM', esp. an async action
// I think it needs to take all of the data it needs as parameters, since
// I don't think they "get" anything from the reducers before being dispatched
// all the dispatches seem to happen here in the action-definitions themseles

// XXX: Where do we set the type?
function postAlias(name, expansion) {
  console.log('-- SAVING PROGRAM --');

  // use fetch
  // TODO: polyfill for IE? (Edge is fine)
  const config = {
    method  : 'POST',
    headers : new Headers({
      'Content-Type': 'application/json'
    }),
    mode    : 'cors', 
    cache   : 'default',
    body    : JSON.stringify({name, expansion})
    //credidentials: 'same-origin'
  }

  return function(dispatch) { // any difference if arrow?
    // TODO: possibly have action to say that I *am* saving
    // so that two clicks don't spawn two requests (if content is the same).
    console.log('-- SENDING FETCH --');

    return fetch('http://localhost:3000/user/test/save-program', config)
      .then(
        value => { console.log('-- REQUEST COMPLETED --'); },
        error => { console.error(err); }
      )
      .then(() => dispatch(savedAlias()));
  }
}

module.exports = {
    pushFunction
  , clearCanvas
  , popFromCanvas
  , pushInput
  , selectInput
  , displayFunction
  , addProgram
  , updateProgramName
  , updateProgramNameBuffer
  , editName
  , expandSavedProgram
  , collapseProgram
  , saveAlias
  , postAlias
}
