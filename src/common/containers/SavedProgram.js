const React = require('react');
const { connect } = require('react-redux');
const { pushFunction } = require('../actions/program-canvas');
const { pushToOverlayProgram } = require('../actions/edit');
const { displayDerived } = require('../actions/display');

const mapDispatchToProps = dispatch => ({ 
  display: (id, name) => {
    dispatch(displayDerived(id, name));
  },
  pushToCanvas: token => {
    dispatch(pushFunction(token));
  },
  pushToOverlay: token => {
    dispatch(pushToOverlayProgram(token));
  }
});

const mapStateToProps = state => ({
  editing: state.edit.editing
});

class Container extends React.Component {
  render() {
    const {program, id, name}  = this.props.obj;
    const {editing, display, pushToOverlay, pushToCanvas} = this.props;
    const alias = {name, expansion: program};
    const push = editing ? pushToOverlay : pushToCanvas;

    return (
      <div className="function"
        onClick={() => display(id, name)}
        onDoubleClick={() => push(alias)}>
        {name}
      </div>
    );
  }
}

const SavedProgram = connect(mapStateToProps, mapDispatchToProps)(Container);
module.exports = SavedProgram;
