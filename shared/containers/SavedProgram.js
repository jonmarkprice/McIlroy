const React = require('react');
const EditSavedProgram = require('../containers/EditSavedProgram');
const { connect } = require('react-redux');
const { pushFunction } = require('../actions/program-canvas');
const { displayDerived } = require('../actions/display');

const mapDispatchToProps = dispatch => ({ 
  display: (id, name) => {
    dispatch(displayDerived(id, name));
  },
  add: token => {
    dispatch(pushFunction(token));
  }
});

class Container extends React.Component {
  render() {
    const {program, id, name} = this.props.obj;
    const alias = {name, expansion: program};
    return (
      <div className="function"
        onClick={() => this.props.display(id, name)}
        onDoubleClick={() => this.props.add(alias)}>
        {name}
      </div>
    );
  }
}

const SavedProgram = connect(undefined, mapDispatchToProps)(Container);
module.exports = SavedProgram;
