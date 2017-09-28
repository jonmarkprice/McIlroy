import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';
import { updateProgramName,
         updateProgramNameBuffer,
         editName } from '../actions';
import FunctionName from '../components/FunctionName';
import AliasEditPanel from '../components/AliasEditPanel';

// TODO:
// Next, don't include program at all in this. Instead, it will be sent over
// as the data part of an action.
const mapStateToProps = state => ({
  program : state.saved.program,
  name    : state.saved.name, // would be [{name: _, program: [...]}, ...]
  editing : state.saved.editing
});

const mapDispatchToProps = dispatch => ({
  onNameUpdate: text => {
    dispatch(updateProgramName())
  },
  onNameChange: text => {
    dispatch(updateProgramNameBuffer(text))
  },
  onEditName: () => {
    dispatch(editName())
  }
});

class Alias__ extends React.Component {
  render() {
    // XXX:
    // This is not working. I think the Alias components does not re-render...
    // But I'm not sure whether a) it's not supposed to, unless I do something
    // "special" or b) something is going wrong, e.g. I am mutating state
    // somewhere.
    let toDisplay;
    if (this.props.editing) {
      toDisplay = (<AliasEditPanel
                    name={this.props.name}
                    onNameUpdate={this.props.onNameUpdate}
                    onNameChange={this.props.onNameChange}
                  />);
    } else {
      toDisplay = (<FunctionName
                    name={this.props.name}
                    onEditName={this.props.onEditName}
                  />);
    }
    return (
      <div id="aliases" className="box">
        <h2>Aliases</h2>
        {toDisplay}
        <ProgramRow program={this.props.program} />
        <button disabled="disabled">Load</button>
      </div>
    );
  }
}

/*
const AliasPane = (program) => (
  <div id="aliases" className="container">
    <h2>Aliases</h2>
    <ProgramRow program={program} />
    <button disabled="disabled">Load</button>
  </div>
);*/

const Aliases = connect(mapStateToProps, mapDispatchToProps)(Alias__);

export default Aliases;
