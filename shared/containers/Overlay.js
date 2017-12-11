const React = require('react');
const ProgramRow = require('../components/ProgramRow');
const { connect } = require('react-redux');
const { unsetEditing } = require('../actions/edit');

const mapStateToProps = state => ({
  editing: state.edit.editing,
  id: state.edit.id,
  saved: state.saved.programs[state.edit.id]
});

const mapDispatchToProps = dispatch => ({
  done: () => { dispatch(unsetEditing()); }
});

class OverlayComponent extends React.Component {
  render() {
    if (this.props.editing) {
      return (
        <div id="overlay">
          <h2>{this.props.saved.name}</h2>
          <button id="save-edits" onClick={this.props.done}>
            Save
          </button>
          <button id="cancel-edits" onClick={this.props.done}>
            Cancel
          </button>
          <ProgramRow program={this.props.saved.program} />
        </div>
      );
    } else {
      return <div className="hide"></div>;
    }
  }
}

const Overlay = connect(mapStateToProps, mapDispatchToProps)(OverlayComponent);
module.exports = Overlay;
