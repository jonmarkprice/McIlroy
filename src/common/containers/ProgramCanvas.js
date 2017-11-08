const React       = require('react');
const ProgramRow  = require('../components/ProgramRow');
const { connect } = require( 'react-redux');
const { clearCanvas, popFromCanvas, addProgram } = require('../actions');

const mapStateToProps = state => ({
  program: state.program,
});

const mapDispatchToProps = dispatch => {
  return {
    onClear: () => {
      dispatch(clearCanvas());
    },
    onBackspace: () => {
      dispatch(popFromCanvas());
    },
    onAddProgram: () => {
      dispatch(addProgram())
    }
  };
};

class ProgramInput extends React.Component {
  render() {
    return (
      <div id="program-input" className="box">
        <h2>Canvas</h2>
        <ProgramRow program={this.props.program} />
        <button id="save" onClick={this.props.onAddProgram}>
          Save
        </button>
        <button id="clear-canvas" onClick={this.props.onClear}>
          Clear
        </button>
        <button id="backspace" onClick={this.props.onBackspace}>
          Backspace
        </button>
      </div>
    );
  }
}

const ProgramCanvas = connect(mapStateToProps, mapDispatchToProps)(ProgramInput);
module.exports = ProgramCanvas;
