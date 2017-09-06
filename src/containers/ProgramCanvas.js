import React from 'react';
import ProgramRow from '../components/ProgramRow';
import { connect } from  'react-redux';

const mapStateToProps = state => ({
  program: state.program,
});

class ProgramInput extends React.Component {
  render() {
    return (
      <div id="program-input" className="box">
        <h2>Program</h2>
        <ProgramRow program={this.props.program} />
      </div>
    );
  }
}

const ProgramCanvas = connect(mapStateToProps)(ProgramInput);

export default ProgramCanvas;
