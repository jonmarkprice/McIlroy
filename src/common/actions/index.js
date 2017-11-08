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
}
