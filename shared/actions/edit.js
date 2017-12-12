const EDIT = {
  EDITING: {
    SET: 'EDIT::EDITING::SET',
    UNSET: 'EDIT::EDITING::UNSET',
    NEW: 'EDIT::EDITING::NEW',
  }
}

const setEditing = (id, name, program) =>
  ({type: EDIT.EDITING.SET, id, name, program});

const unsetEditing = () =>
  ({type: EDIT.EDITING.UNSET});

const openNew = (id, program) =>
  ({type: EDIT.EDITING.NEW, id, program});

module.exports = {
  EDIT
, setEditing
, unsetEditing
, openNew
};
