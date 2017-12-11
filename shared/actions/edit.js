const EDIT = {
  EDITING: {
    SET: 'EDIT::EDITING::SET',
    UNSET: 'EDIT::EDITING::UNSET'
  }
}

const setEditing = () =>
  ({type: EDIT.EDITNG.SET});

const unsetEditing = () =>
  ({type: EDIT.EDITING.UNSET});

module.exports = {
  EDIT
, setEditing
, unsetEditing
};
