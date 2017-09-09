// Action Creators

export const pushFunction = (name) =>
  ({ type: 'PUSH_FUNCTION', name });

export const clearCanvas = () =>
  ({type: 'CLEAR_CANVAS'});

export const pushInput = (name) =>
  ({type: 'PUSH_INPUT', name});

export const selectInput = (index) =>
  ({type: 'SELECT_INPUT', index})
