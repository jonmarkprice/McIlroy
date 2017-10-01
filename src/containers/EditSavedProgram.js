import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';
import { updateProgramName
       , updateProgramNameBuffer
       , editName
       , clearCanvas
       , pushFunction
       , collapseProgram } from '../actions';

// TODO: rename both
import FunctionName from '../components/FunctionName';
import AliasEditPanel from '../components/AliasEditPanel';

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
    console.log('RENDERING EditSavedProgram')
    let toDisplay;
    if (this.props.obj.editing_name) {
      toDisplay = (
        <AliasEditPanel
          program_id={this.props.obj.id}
          name={this.props.obj.name}
          onNameUpdate={this.props.onNameUpdate}
          onNameChange={this.props.onNameChange}
        />);
    } else {
      toDisplay = (
        <FunctionName
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
          this.props.onClear();
          this.props.obj.program.forEach(f => this.props.addTokenToCanvas(f));
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

const SavedFunction = connect(undefined, mapDispatchToProps)(Container);

export default SavedFunction;
