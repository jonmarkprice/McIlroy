const React       = require('react');
const ProgramRow  = require('../components/ProgramRow');
const { connect } = require( 'react-redux');
const { clearCanvas, popFromCanvas } = require('../actions/program-canvas');

const mapStateToProps = state => ({
  program: state.program
});

const mapDispatchToProps = dispatch => {
  return {
    onClear: () => {
      dispatch(clearCanvas());
    },
    onBackspace: () => {
      dispatch(popFromCanvas());
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
        <button id="backspace" onClick={this.props.onBackspace}>
          Backspace
        </button>
      </div>
    );
  }
}

const ProgramCanvas = connect(mapStateToProps, mapDispatchToProps)(ProgramInput);
module.exports = ProgramCanvas;
