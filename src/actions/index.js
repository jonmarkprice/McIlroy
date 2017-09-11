// Action Creators

export const pushFunction = (name) =>
  ({ type: 'PUSH_FUNCTION', name });

export const clearCanvas = () =>
  ({type: 'CLEAR_CANVAS'});

export const pushInput = (input) =>
  ({type: 'PUSH_INPUT', input});

export const selectInput = (index) =>
  ({type: 'SELECT_INPUT', index})
