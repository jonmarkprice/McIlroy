import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';
import { updateProgramName,
         updateProgramNameBuffer,
         editName } from '../actions';
import FunctionName from '../components/FunctionName';
import AliasEditPanel from '../components/AliasEditPanel';

const mapDispatchToProps = dispatch => ({
  onNameUpdate: id => {
    dispatch(updateProgramName(id))
  },
  onNameChange: (id, text) => {
    dispatch(updateProgramNameBuffer(id, text))
  },
  onEditName: id => {
    dispatch(editName(id))
  }
});

// TODO: How do we get the id of the current component?
// It can come from
//  1. the props directly (from a parent component), or
//  2. the state, via mapStateToProps
//
// But it can't come from the state, since I don't know *which* of them to
// get...
// Presumably, in the parent I iterate over *all* saved programs and pass
// an id via regular props to each.
class Container extends React.Component {
  render() {
    console.dir(this.props.obj)
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
    return (
      <div id="aliases" className="box">
        {toDisplay}
        <ProgramRow program={this.props.obj.program} />
        <button disabled="disabled">Load</button>
      </div>
    );
  }
}

const Aliases = connect(undefined, mapDispatchToProps)(Container);

export default Aliases;
