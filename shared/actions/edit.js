const EDIT = {
  EDITING: {
    SET: 'EDIT::EDITING::SET',
    UNSET: 'EDIT::EDITING::UNSET',
    NEW: 'EDIT::EDITING::NEW',
  },
  PROGRAM: {
    CLEAR: 'EDIT::PROGRAM::CLEAR',
    BACKSPACE: 'EDIT::PROGRAM::BACKSPACE',
    PUSH: 'EDIT::PROGRAM::PUSH'
  },
  MESSAGE: {
    DISPLAY: 'EDIT::MESSAGE::DISPLAY'
  }
};

const setEditing = (id, name, program) =>
  ({type: EDIT.EDITING.SET, id, name, program});

const unsetEditing = () =>
  ({type: EDIT.EDITING.UNSET});

const openNew = (id, program) =>
  ({type: EDIT.EDITING.NEW, id, program});

const clearOverlayProgram = () => 
  ({type: EDIT.PROGRAM.CLEAR}); 
 
const backspaceOverlayProgram = () => 
  ({type: EDIT.PROGRAM.BACKSPACE}); 

const pushToOverlayProgram = token => 
  ({type: EDIT.PROGRAM.PUSH, token});

const displayEditMessage = message =>
  ({type: EDIT.MESSAGE.DISPLAY, message});

module.exports = {
  EDIT
, setEditing
, unsetEditing
, openNew
, clearOverlayProgram
, backspaceOverlayProgram
, pushToOverlayProgram
, displayEditMessage
};
