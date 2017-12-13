const React = require('react');
const EditProgram = require('./EditProgram');
const { connect } = require('react-redux');
const dbg = require('../../src/common/dbgconf')('containers:edit-saved');

const {
  // enableEditng
  // disableEditing
  unsetEditing
} = require('../actions/edit');

// update UI only (no server)
// TODO: rewrite to also update expansion
const { updateProgram } = require('../actions/saved');

const { updateProgramOnServer } = require('../actions/saved-async');

const mapStateToProps = state => ({
  id      : state.edit.id,
  name    : state.edit.name,
  program : state.edit.program,
});

const mapDispatchToProps = dispatch => ({
  done: () => {
    dispatch(unsetEditing());
  },
  edit: (id, oldName, newName, newProgram) => {
    dbg('-- DISPATCHING actions --');
    dbg(`Renaming id: ${id}`);
    dbg('Dispatching save with new program: %o', newProgram);

    // TODO: Move to be called *AFTER* dispatch successful, maybe by enable
    // editing. // TODO: get those as well...
    dispatch(updateProgram(id, newName, newProgram)); // UI
    dispatch(unsetEditing());
    
    // dispatch async action to server // id optional
    dispatch(updateProgramOnServer(id, oldName, newName, newProgram));
  },
  clear: () => {
    dispatch(clearOverlayProgram());
  },
  backspace: () => {
    dispatch(backspaceOverlayProgram());
  }
  // addToken: text => {
  //   dispatch(pushFunction(text));
  // },
});

class SavedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    // XXX: If I update this.props.program, will it the name?
    // May have to go back to onChange and using buffers/actions
    const {edit, id, name, program} = this.props;
    dbg("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    dbg(`new name: ${newName}`);
    edit(id, name, newName, program); 
  }
 
  render() {
    return (
      <div id="overlay">
        <form className="overlay-form" id="edit-form"
          onSubmit={event => {
            event.preventDefault();
            //onNameUpdate(program_id, name, 'TODO');
            this.nameUpdate(); // call ref. function
          }}>
          <h2>Editing {this.props.name}</h2>
          <label id="overlay-name-label">Name</label>
          <input type="text" id="overlay-name-field"
            defaultValue={this.props.name}
            ref={x => { this.nameField = x; }} />

          <EditProgram />

          <input type="submit" value="Save" />
          <button type="button" id="cancel-edits" onClick={this.props.done}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

const EditSaved = connect(mapStateToProps, mapDispatchToProps)(SavedComponent);
module.exports = EditSaved;
