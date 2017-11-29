const React       = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { updateProgramName
       , updateProgramNameBuffer
       , editName
       , clearCanvas
       , pushFunction
       , collapseProgram } = require('../actions');
const ProgramName     = require('../components/ProgramName');
const EditProgramName = require('../components/EditProgramName');

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
          //this.props.onClear();
          //const alias = {
            //type    : 'alias',
            //display : this.props.obj.name,
            //value   : [...this.props.obj.program, ':']
            
          //};
          const alias = {
            name: this.props.obj.name,
            expansion: this.props.obj.program
          };
          this.props.addTokenToCanvas(alias);
        }}>
          Load
        </button>
        <button onClick={() => this.props.onProgramCollapse(this.props.obj.id)}
                className="done-editing-saved-function">
          Done
        </button>
      </div>
    );
  }
}

module.exports = connect(undefined, mapDispatchToProps)(Container);
//export default SavedFunction;
