const PUSH_FUNCTION = 'PUSH_FUNCTION';
const pushFunction = name => ({ type: 'PUSH_FUNCTION', name });

const CLEAR_CANVAS = 'CLEAR_CANVAS';
const clearCanvas = () => ({type: CLEAR_CANVAS});

const BACKSPACE = 'BACKSPACE';
const popFromCanvas = () => ({type: BACKSPACE});

module.exports = {
  BACKSPACE, popFromCanvas,  // XXX do not match
  CLEAR_CANVAS, clearCanvas,
  PUSH_FUNCTION, pushFunction
};