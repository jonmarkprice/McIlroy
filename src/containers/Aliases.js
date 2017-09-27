import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';
import { updateProgramName,
         updateProgramNameBuffer,
         editName } from '../actions';

// TODO:
// Next, don't include program at all in this. Instead, it will be sent over
// as the data part of an action.
const mapStateToProps = state => ({
  program : state.saved.program,
  name    : state.saved.name, // would be [{name: _, program: [...]}, ...]
  buffer  : state.buffer,
  editing : state.editing_name
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

const ProgramNamingForm = (onNameUpdate, onNameChange) => (
  <form
    onSubmit={event => {
      event.preventDefault();
      onNameUpdate();
    }}
  >
    <input type="text" id="rename" onChange={event =>
      onNameChange(event.target.value)} />
    <input type="submit" value="Update" />
  </form>
);

class Alias__ extends React.Component {
  render() {
    // XXX:
    // This is not working. I think the Alias components does not re-render...
    // But I'm not sure whether a) it's not supposed to, unless I do something
    // "special" or b) something is going wrong, e.g. I am mutating state
    // somewhere.
    let toDisplay;
    if (this.props.editing) {
      toDisplay = <ProgramNamingForm />;
    } else {
      // TODO: mb. make this a container too...
      toDisplay = (
      <div>
        <h3>{this.props.name}</h3>
        <button onClick={this.props.onEditName}>
          Edit Name
        </button>
      </div>);
    }

    console.log(`Program, at Alias is: ${JSON.stringify(this.props.program)}`);
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
