const React = require('react');
const EditSavedProgram = require('../containers/EditSavedProgram');
const { connect } = require('react-redux');
const { expandSavedProgram } = require('../actions/index');

const mapDispatchToProps = dispatch => ({
  onExpand: id => {
    dispatch(expandSavedProgram(id));
  }
});

class Container extends React.Component {
  // TODO: consider making name a sub-object: {text, buffer, editing}
  render() {
    if (this.props.obj === undefined)
    {
      return (<div>Error</div>);
    }

    let program;
    const id = this.props.obj.id || 0;
    if (this.props.obj.editing) {
      program = (<EditSavedProgram obj={this.props.obj} />);
    } else {
      program = (
        <div onClick={() => this.props.onExpand(id)} className="function">
          {this.props.obj.name}
        </div>
      );
    }
    return program;
  }
}

const SavedProgram = connect(undefined, mapDispatchToProps)(Container);
module.exports = SavedProgram;
