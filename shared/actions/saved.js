const PROGRAM = {
  CREATE: 'PROGRAM::CREATE',
  ADD: 'PROGRAM::ADD',
  REMOVE: 'PROGRAM::REMOVE',
  UPDATE: 'PROGRAME::UPDATE',
  NAME: {
    EDITING: { 
      SET: 'PROGRAM::NAME::EDITING::SET',
      UNSET: 'PROGRAM::NAME::EDITING::UNSET', // or clear
    },
  },
  EXPAND: 'PROGRAM::EXPAND',
  COLLAPSE: 'PROGRAM::COLLAPSE',
  UI: {
    ENABLE: 'PROGRAM::UI::ENABLE',
    DISABLE: 'PROGRAM::UI::DISABLE'
  }
};

// const NEW_PROGRAM = 'NEW_PROGRAM';
const newProgram = program =>
  ({type: PROGRAM.CREATE, program});

// const UPDATE_PROGRAM_NAME = 'UPDATE_PROGRAM_NAME';
const updateProgram = (id, name, expansion) =>
  ({type: PROGRAM.UPDATE, id, name, expansion});

const doneEditingName = id =>
  ({type: PROGRAM.NAME.EDITING.UNSET, id});

// const EDIT_NAME = 'EDIT_NAME';
const editName = id =>
  ({type: PROGRAM.NAME.EDITING.SET, id});

// const EXPAND_PROGRAM = 'EXPAND_SAVED_PROGRAM';
const expandSavedProgram = id => 
  ({type: PROGRAM.EXPAND, id});

// const COLLAPSE_PROGRAM = 'COLLAPSE_SAVED_PROGRAM';
const collapseProgram = id =>
  ({type: PROGRAM.COLLAPSE, id})

// const ADD_PROGRAM = 'ADD_PROGRAM';
const addProgram = (name, expansion) =>
  ({type: PROGRAM.ADD, name, expansion});

// Remove program from UI
// const REMOVE_PROGRAM = 'REMOVE_PROGRAM';
const removeProgram = (id) =>
  ({type: PROGRAM.REMOVE, id});

// TODO // only update in UI
// const RENAME_PROGRAM = 'RENAME_PROGRAM';
// const renameProgram = (id, name) =>
// ({type: PROGRAM.NAME.UPDATE, id, name});

// XXX THESE DO NOTHING ///////////////////////////
// const ENABLE_EDITING = 'ENABLE_EDITING';
const enableEditing = (id) =>
  ({type: PROGRAM.UI.ENABLE, id});

// const DISABLE_EDITING = 'DISABLE_EDITING';
const disableEditing = (id) => 
  ({type: PROGRAM.UI.DISABLE, id});
////////////////////////////////////////////////////

module.exports = {
  PROGRAM // namespace
  , addProgram
  , collapseProgram
  , disableEditing
  , doneEditingName
  , editName
  , enableEditing
  , expandSavedProgram
  , newProgram
  , removeProgram
  , updateProgram
};
