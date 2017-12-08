const React       = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { updateProgramName
       , updateProgramNameBuffer
       , editName
       , collapseProgram
       , enableEditing
       , disableEditing
      } = require('../actions/saved');
const { saveProgram, deleteSavedProgram } = require('../actions/saved-async');
const { clearCanvas, pushFunction } = require('../actions/program-canvas');
const ProgramName     = require('../components/ProgramName');
const EditProgramName = require('../components/EditProgramName');

// Is there any point in these?
// Why not use dispatch in the functions directly?
const mapDispatchToProps = dispatch => ({
  onNameUpdate: id => {
    dispatch(updateProgramName(id));
  },
  onNameChange: (id, text) => {
    dispatch(updateProgramNameBuffer(id, text));
  },
  onEditName: id => {
    dispatch(editName(id));
  },
  onProgramCollapse: id => {
    dispatch(collapseProgram(id));
  },
  onClear: () => {
    dispatch(clearCanvas());
  },
  addTokenToCanvas: text => {
    dispatch(pushFunction(text));
  },
  onPostAlias: (id, name, program) => {
    console.log('-- SENT --');
    dispatch(saveProgram(id, name, program)).then(
      v => { console.log('-- RECIEVED --'); },
      e => { console.error(e); }
    );
  },
  onProgramDelete: (id, name) => {
    // console.log("TODO: dispatch delete");
    // dispatch(disableEditing(id)); // dispatch a disable... mabye here, maybe from within...
    // dispatch() // request
    console.log(`onProgramDelete name: ${name}`)
    dispatch(deleteSavedProgram(id, name))
    /*.then(
      value => {
        // Need requests to retrieve errors, right?
        // disptach(); // update request --> would this be a better metric that 'disabled' directly?
        enableEditing(id); },
      error => {
        // disptach(); // update request
        console.error(error); }
    );*/
  }
});

// To get the id of the current component, we iterate over *all* saved programs
// in the parent and pass an id via props to each SavedProgram.
class Container extends React.Component {
  render() {
    let toDisplay;
    if (this.props.obj.editing_name) {
      toDisplay = (
        <EditProgramName
          program_id={this.props.obj.id}
          name={this.props.obj.name}
          onNameUpdate={this.props.onNameUpdate}
          onNameChange={this.props.onNameChange}
        />);
    } else {
      toDisplay = (
        <ProgramName
          name={this.props.obj.name}
          onEditName={() => this.props.onEditName(this.props.obj.id)}
        />);
    }

    // TODO: Consider encapsulating {toDisplay} under a new EditSavedProgram
    // container. Then we decide here between "open" and "closed" and within
    // the next "open" branch (EditSavedProgram), we differentiate between
    // editing the name or not.
    // Actually, just call rename this to EditSavedProgram... and make more
    // general component/container under SavedProgramList
    return (
      <div id="aliases" className="box">
        {toDisplay}
        <ProgramRow program={this.props.obj.program} />
        <button onClick={() => {
          const alias = {
            name: this.props.obj.name,
            expansion: this.props.obj.program
          };
          this.props.addTokenToCanvas(alias);
        }}>
          Load
        </button>
        <button onClick={() => {
          // I can't decide if I still want to collapse on save, or not...
          // this.props.onProgramCollapse(this.props.obj.id);
          this.props.onPostAlias(
            this.props.obj.id,
            this.props.obj.name,
            this.props.obj.program); 
          }}
          className="done-editing-saved-function">
          Save to server {/* or "Done editing" */}
        </button>
        <button onClick={() => this.props.onProgramCollapse(this.props.obj.id)}>
          Close
        </button>
        <button onClick={() => {
            console.log(`onclkc name: ${this.props.obj.name}`);
            this.props.onProgramDelete(
              this.props.obj.id, 
              this.props.obj.name);
          }
        }>
          Delete
        </button>
      </div>
    );
  }
}

module.exports = connect(undefined, mapDispatchToProps)(Container);
//export default SavedFunction;
