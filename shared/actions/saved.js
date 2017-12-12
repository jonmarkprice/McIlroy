const PROGRAM = {
  ADD   : 'PROGRAM::ADD',
  REMOVE: 'PROGRAM::REMOVE',
  UPDATE: 'PROGRAME::UPDATE',
  UI: {
    ENABLE: 'PROGRAM::UI::ENABLE',
    DISABLE: 'PROGRAM::UI::DISABLE'
  }
};

const updateProgram = (id, name, expansion) => 
  ({type: PROGRAM.UPDATE, id, name, expansion});

const addProgram = (name, expansion) =>
  ({type: PROGRAM.ADD, name, expansion});

// Remove program from UI
const removeProgram = (id) =>
  ({type: PROGRAM.REMOVE, id});

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
  , disableEditing
  , enableEditing
  , removeProgram
  , updateProgram
};
