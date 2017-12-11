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
  editing : state.edit.editing,
  id      : state.edit.id,
  saved   : state.saved.programs[state.edit.id]
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

class OverlayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    console.log("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    console.log(`new name: ${newName}`);
    this.props.rename(this.props.id, this.props.saved.name, newName); 
  }
 
  render() {
    if (this.props.editing) {
      return (
        <div id="overlay">
          <h2>{this.props.saved.name}</h2>
          <form className="dbg"
            onSubmit={event => {
              event.preventDefault();
              //onNameUpdate(program_id, name, 'TODO');
              this.nameUpdate(); // call ref. function
            }}>

            <ProgramRow program={this.props.saved.program} />

            <input type="text" id="rename"
              defaultValue={this.props.name}
              ref={x => { this.nameField = x; }} />
            <input type="submit" value="Save" />
          </form>
          {/*
          TODO: Eventually, want this -> cancel.
          and make save close automatically (after disableUI)
          */}
          <button id="cancel-edits" onClick={this.props.done}>
            Close
          </button>
        </div>
      );
    } else {
      return <div className="hide"></div>;
    }
  }
}

const Overlay = connect(mapStateToProps, mapDispatchToProps)(OverlayComponent);
module.exports = Overlay;
