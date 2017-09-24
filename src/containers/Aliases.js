import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';

// TODO:
// Next, don't include program at all in this. Instead, it will be sent over
// as the data part of an action.
const mapStateToProps = state => ({
  program : state.saved.program,
  name    : state.saved.name // would be [{name: _, program: [...]}, ...]
});

// const mapDispatchToProps = () => {}
class Alias__ extends React.Component {
  render() {
    console.log(`Program, at Alias is: ${JSON.stringify(this.props.program)}`);

    return (
      <div id="aliases" className="box">
        <h2>Aliases</h2>
        <h3>{this.props.name}</h3>
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

const Aliases = connect(mapStateToProps, undefined)(Alias__);

export default Aliases;
