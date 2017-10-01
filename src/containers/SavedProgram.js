import React from 'react';
import EditSavedProgram from '../containers/EditSavedProgram';

class SavedProgram extends React.Component {
  render() {
    return (<EditSavedProgram obj={this.props.obj} />);
  }
}

/*
import { connect } from 'react-redux';
import { expandSavedProgram } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  onExpand: dispatch(expandSavedProgram)
});

class Container extends React.Component {
  // TODO: need to repurpose "editing" and add a new "editing name"
  // or even a sub-object: name{text, buffer, editing}
  render() {
    let program;
    const id = this.props.obj.id || 0;
    if (this.props.obj.editing) {
      program = (<EditSavedProgram />);
    } else {
      program = (
        // TODO def, and dispatchers
        <div onClick={() => this.props.onExpand(id)} className="function">
          {this.props.obj.name}
        </div>
      );
    }
    return program;
  }
}

const SavedProgram = connect(undefined, mapDispatchToProps)(Container);
*/
export default SavedProgram;
