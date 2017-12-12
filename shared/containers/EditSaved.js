const React = require('react');
const ProgramRow = require('../components/ProgramRow');
const { connect } = require('react-redux');
const dbg = console.log;

const {
  // , clearProgram     // TODO
  // , backspaceProgram // TODO
  // enableEditng
  // disableEditing
  unsetEditing
} = require('../actions/edit');

// update UI only (no server)
const { updateProgramName } = require('../actions/saved');

const { 
  updateProgramOnServer
} = require('../actions/saved-async');

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
    console.log('-- DISPATCHING actions --');
    dbg(`Renaming id: ${id}`);
    // TODO: Move to be called *AFTER* dispatch successful, maybe by enable
    // editing. // TODO: get those as well...
    dispatch(updateProgramName(id, newName)); // UI
    dispatch(unsetEditing());
    
    // dispatch async action to server // id optional
    dispatch(updateProgramOnServer(id, oldName, newName, newProgram));
  }
  // TODO: Implement after save, delete, rename.
  // clear: () => {
  //   dispatch(clearCanvas());
  // },
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
    console.log("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    console.log(`new name: ${newName}`);
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
          <label id="overlay-definition-label">Definition</label>
          <ProgramRow program={this.props.program} />

          <input type="submit" value="Save" />
          <button id="cancel-edits" onClick={this.props.done}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

const EditSaved = connect(mapStateToProps, mapDispatchToProps)(SavedComponent);
module.exports = EditSaved;
