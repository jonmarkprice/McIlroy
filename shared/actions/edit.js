const EDIT = {
  EDITING: {
    SET: 'EDIT::EDITING::SET',
    UNSET: 'EDIT::EDITING::UNSET'
  }
}

const setEditing = id =>
  ({type: EDIT.EDITING.SET, id});

const unsetEditing = () =>
  ({type: EDIT.EDITING.UNSET});

module.exports = {
  EDIT
, setEditing
, unsetEditing
};
