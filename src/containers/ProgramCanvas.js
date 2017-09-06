import React from 'react';
import ProgramRow from '../components/ProgramRow';
import { connect } from  'react-redux';
import { clearCanvas } from '../actions';

const mapStateToProps = state => ({
  program: state.program,
});

const mapDispatchToProps = dispatch => {
  return {
    onClear: () => {
      dispatch(clearCanvas());
    }
  };
};

class ProgramInput extends React.Component {
  render() {
    return (
      <div id="program-input" className="box">
        <h2>Canvas</h2>
        <ProgramRow program={this.props.program} />
        <button id="clear-canvas" onClick={this.props.onClear}>
          Clear
        </button>
      </div>
    );
  }
}

const ProgramCanvas = connect(mapStateToProps, mapDispatchToProps)(ProgramInput);

export default ProgramCanvas;
