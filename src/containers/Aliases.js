import React from 'react';
import { connect } from 'react-redux';
import ProgramRow from '../components/ProgramRow';
import { updateProgramName } from '../actions';
// TODO:
// Next, don't include program at all in this. Instead, it will be sent over
// as the data part of an action.
const mapStateToProps = state => ({
  program : state.saved.program,
  name    : state.saved.name // would be [{name: _, program: [...]}, ...]
});

const mapDispatchToProps = dispatch => ({
  onNameUpdate: text => {
    dispatch(updateProgramName(text))
  }
});

// TODO: Planned: make a function
// const class AliasNameEdit = ()

class Alias__ extends React.Component {
  render() {
    console.log(`Program, at Alias is: ${JSON.stringify(this.props.program)}`);

    return (
      <div id="aliases" className="box">
        <h2>Aliases</h2>
        <div>{/*TODO: fn to show button / input field */}
          <h3>{this.props.name}</h3>
          <form
            onSubmit={event => {
              event.preventDefault()
              this.props.onNameUpdate("FROM BUTTON")
            }}
          >
            <input type="text" id="rename" onChange={() => {
                console.log('TODO: update state...')
              }} />
            <input type="submit" value="Update" />
          </form>
        </div>
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
