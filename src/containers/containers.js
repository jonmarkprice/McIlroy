import React from 'react';
import ProgramRow from '../components/ProgramRow';
import { connect } from  'react-redux';
import { pushFunction } from '../actions';

// These connect to Redux
// Shape of state:
// const initialState = {
//   input: ['hello'],
//   program: []
// }

const mapStateToProps = state => ({
  program: state.program,
});

const mapDispatchToProps = dispatch => {
  return {
    onPushFunction: text => {
      dispatch(pushFunction(text));
    }
  };
};

class ProgramInput extends React.Component {
  render() {
    // console.log(`(ProgramCanvas) program is: ${this.props.program}`);
    return (
      <div id="program-input" className="box">
        <h2>Program</h2>
        <ProgramRow program={this.props.program} />
      </div>
    );
  }
}

const ProgramCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramInput);

export default ProgramCanvas;
