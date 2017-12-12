const React = require('react');
const ProgramRow = require('../components/ProgramRow');
const { connect } = require('react-redux');
const EditSaved   = require('../containers/EditSaved');
const EditNew     = require('../containers/EditNew');
const dbg = console.log;

const mapStateToProps = state => ({
  editing : state.edit.editing,
  saved   : state.edit.saved
});

class OverlayComponent extends React.Component {
  render() {
    if (this.props.editing && this.props.saved === true) {
      return <EditSaved />;
    } else if (this.props.editing && this.props.saved === false) {
      return <EditNew />;
    } else {
      return <div className="hide"></div>;
    }
  }
}

const Overlay = connect(mapStateToProps)(OverlayComponent);
module.exports = Overlay;
