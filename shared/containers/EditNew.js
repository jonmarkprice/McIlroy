const React = require('react');
const EditProgram = require('./EditProgram');
const { connect } = require('react-redux');

const dbg = console.log;

const {
  // enableEditng
  // disableEditing
  unsetEditing
} = require('../actions/edit');
const { addProgram } = require('../actions/saved');
const { saveProgram } = require('../actions/saved-async');

const mapStateToProps = state => ({
  program : state.edit.program,
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
  save: (name, program) => {
    console.log('-- SENT --');
    dispatch(saveProgram(name, program)).then(
      v => { console.log('-- RECIEVED --'); },
      e => { console.error(e); }
    );
  },
  addToUI: (name, program) => {
    dispatch(addProgram(name, program));
  }
});

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    console.log("-- FORM SUMBITTED --");
    const name = this.nameField.value;
    console.log(`new name: ${name}`);
    this.props.save(name, this.props.program);
    this.props.addToUI(name, this.props.program);
    this.props.done();
  }
 
  render() {
    return (
      <div id="overlay">
        <form className="overlay-form" id="new-form"
          onSubmit={event => {
            event.preventDefault();
            this.nameUpdate(); // call ref. function
          }}> 
          <h2>New Program</h2>
          <label id="overlay-name-label">Name</label>
          <input type="text" id="overlay-name-field"
            ref={x => { this.nameField = x; }} />

          <EditProgram />

          <input type="submit" value="Save" />
          <button id="cancel-edits" onClick={this.props.done}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

const EditNew = connect(mapStateToProps, mapDispatchToProps)(NewComponent);
module.exports = EditNew;
