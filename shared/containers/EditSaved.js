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
  // saveProgram 
  updateNameOnServer
} = require('../actions/saved-async');

const mapStateToProps = state => ({
  // editing : state.edit.editing,
  id      : state.edit.id,
  name    : state.edit.name,
  program : state.edit.program,
  // saved   : state.edit.saved
});

const mapDispatchToProps = dispatch => ({
  done: () => {
    dispatch(unsetEditing());
  },
  rename: (id, oldName, newName) => {
    console.log('-- DISPATCHING actions --');
    dbg(`Renaming id: ${id}`);
    // TODO: Move to be called *AFTER* dispatch successful, maybe by enable
    // editing. // TODO: get those as well...
    dispatch(updateProgramName(id, newName)); // UI
    dispatch(unsetEditing());
    
    // dispatch async action to server // id optional
    dispatch(updateNameOnServer(id, oldName, newName));
  }
  // TODO: Implement after save, delete, rename.
  // clear: () => {
  //   dispatch(clearCanvas());
  // },
  // addToken: text => {
  //   dispatch(pushFunction(text));
  // },
  /*
  save: (id, name, program) => {
    console.log('-- SENT --');
    dispatch(saveProgram(id, name, program)).then(
      v => { console.log('-- RECIEVED --'); },
      e => { console.error(e); }
    );
  }*/
});

class SavedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    console.log("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    console.log(`new name: ${newName}`);
    this.props.rename(this.props.id, this.props.name, newName); 
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
