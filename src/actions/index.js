// Action Creators

export const pushFunction = (name) =>
  ({ type: 'PUSH_FUNCTION', name });

export const clearCanvas = () =>
  ({type: 'CLEAR_CANVAS'});

export const popFromCanvas = () =>
  ({type: 'BACKSPACE'});

export const pushInput = (input) =>
  ({type: 'PUSH_INPUT', input});

export const selectInput = (index) =>
  ({type: 'SELECT_INPUT', index});

export const displayFunction = (name) =>
  ({type: 'DISPLAY_FUNCTION', name});

export const addProgram = (name) => {
  console.log('adding program')
  return ({type: 'SAVE_PROGRAM', name});
}

export const updateProgramName = (name) =>
  ({type: 'NAME_PROGRAM', name});
