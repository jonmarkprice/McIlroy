const NEW_PROGRAM = 'NEW_PROGRAM';
const newProgram = program => ({type: NEW_PROGRAM, program});

const UPDATE_PROGRAM_NAME = 'UPDATE_PROGRAM_NAME';
const updateProgramName = id => ({type: UPDATE_PROGRAM_NAME, id});

const UPDATE_PROGRAM_NAME_BUFFER = 'UPDATE_NAME_BUFFER'
const updateProgramNameBuffer = (id, text) =>
  ({type: UPDATE_PROGRAM_NAME_BUFFER, id, text});

const EDIT_NAME = 'EDIT_NAME';
const editName = id =>
  ({type: EDIT_NAME, id});

const EXPAND_PROGRAM = 'EXPAND_SAVED_PROGRAM';
const expandSavedProgram = id => 
  ({type: EXPAND_PROGRAM, id});

const COLLAPSE_PROGRAM = 'COLLAPSE_SAVED_PROGRAM';
const collapseProgram = id =>
  ({type: COLLAPSE_PROGRAM, id})

// const saveAlias = (name, expansion) =>
//  ({type: 'SAVE_ALIAS', name, expansion});
const ADD_PROGRAM = 'ADD_PROGRAM';
const addProgram = (name, expansion) =>
  ({type: ADD_PROGRAM, name, expansion});

// TODO: impl
const ENABLE_EDITING = 'ENABLE_EDITING';
const enableEditing = (id) =>
  ({type: ENABLE_EDITING, id});

const DISABLE_EDITING = 'DISABLE_EDITING';
const disableEditing = (id) => 
  ({type: DISABLE_EDITING, id});

// from UI
const REMOVE_PROGRAM = 'REMOVE_PROGRAM';
const removeProgram = (id) =>
  ({type: REMOVE_PROGRAM, id});

module.exports = {
  ADD_PROGRAM, addProgram,
  COLLAPSE_PROGRAM, collapseProgram,
  EDIT_NAME, editName,
  EXPAND_PROGRAM, expandSavedProgram,
  NEW_PROGRAM, newProgram,
  UPDATE_PROGRAM_NAME, updateProgramName,
  UPDATE_PROGRAM_NAME_BUFFER, updateProgramNameBuffer,

  DISABLE_EDITING, disableEditing,
  ENABLE_EDITING, enableEditing,
  REMOVE_PROGRAM, removeProgram

  // Async actions
  // postAlias
};