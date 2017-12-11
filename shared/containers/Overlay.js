const React = require('react');
const { connect } = require('react-redux');
const { unsetEditing } = require('../actions/edit');

const mapStateToProps = state => ({
  editing: state.edit.editing
});

const mapDispatchToProps = dispatch => ({
  done: () => { dispatch(unsetEditing()); }
});

class OverlayComponent extends React.Component {
  render() {
    if (this.props.editing) {
      return (
        <div id="overlay">
          <button id="done-editing" onClick={this.props.done}>
            Done
          </button>
        </div>
      );
    } else {
      return <div className="hide"></div>;
    }
  }
}

const Overlay = connect(mapStateToProps, mapDispatchToProps)(OverlayComponent);
module.exports = Overlay;
