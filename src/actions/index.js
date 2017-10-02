// Action Creators

export const pushFunction = name =>
  ({ type: 'PUSH_FUNCTION', name });

export const clearCanvas = () =>
  ({type: 'CLEAR_CANVAS'});

export const popFromCanvas = () =>
  ({type: 'BACKSPACE'});

export const pushInput = input =>
  ({type: 'PUSH_INPUT', input});

export const selectInput = index =>
  ({type: 'SELECT_INPUT', index});

export const displayFunction = name =>
  ({type: 'DISPLAY_FUNCTION', name});

export const addProgram = () =>
  ({type: 'SAVE_PROGRAM'});

export const updateProgramName = id =>
  ({type: 'NAME_PROGRAM', id});

export const updateProgramNameBuffer = (id, text) =>
  ({type: 'UPDATE_NAME_BUFFER', id, text});

export const editName = id =>
  ({type: 'EDIT_NAME', id});

export const expandSavedProgram = id =>
  ({type: 'EXPAND_SAVED_PROGRAM', id});

export const collapseProgram = id =>
  ({type: 'COLLAPSE_SAVED_PROGRAM', id})
