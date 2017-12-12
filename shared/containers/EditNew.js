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

//const { 
  // saveProgram 
//} = require('../actions/saved-async');

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

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.nameUpdate = this.nameUpdate.bind(this);
  }

  /*
  nameUpdate() {
    console.log("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    console.log(`new name: ${newName}`);
    this.props.rename(this.props.id, this.props.name, newName); 
  }
  */
 
  render() {
    return (
      <div id="overlay">
        <h2>New Program</h2>
        <form className="dbg"
          onSubmit={event => {
            event.preventDefault();
            //onNameUpdate(program_id, name, 'TODO');
            // this.nameUpdate(); // call ref. function
          }}> 

          <ProgramRow program={this.props.program} />

          <input type="text" id="rename"
            defaultValue={this.props.name}
            ref={x => { this.nameField = x; }} />
          <input type="submit" value="Save" />
        </form>
        <button id="cancel-edits" onClick={this.props.done}>
          Cancel
        </button>    
      </div>
    );
  }
}

const EditNew = connect(mapStateToProps, mapDispatchToProps)(NewComponent);
module.exports = EditNew;
