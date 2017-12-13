const React = require('react');
const ProgramRow = require('../components/ProgramRow');
const { connect } = require('react-redux');

const {
  clearOverlayProgram
  , backspaceOverlayProgram
} = require('../actions/edit');

const mapStateToProps = state => ({
  program : state.edit.program,
});

const mapDispatchToProps = dispatch => ({
  clear: () => {
    dispatch(clearOverlayProgram());
  },
  backspace: () => {
    dispatch(backspaceOverlayProgram());
  }
  // addToken: text => {
  //   dispatch(pushFunction(text));
  // },
});

class EditComponent extends React.Component {
  render() {
    return (
      <div className="edit-program">
        <label id="overlay-definition-label">Definition</label>
        <ProgramRow program={this.props.program} />

        <button type="button"
          id="clear-overlay-program"
          onClick={this.props.clear}>
          Clear
        </button>

        <button type="button"
          id="backspace-overlay-program"
          onClick={this.props.backspace}>
          Backspace
        </button>
      </div>
    );
  }
}

const EditProgram = connect(mapStateToProps, mapDispatchToProps)(EditComponent);
module.exports = EditProgram;
