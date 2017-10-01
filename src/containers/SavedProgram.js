import React from 'react';
import EditSavedProgram from '../containers/EditSavedProgram';
/*
class SavedProgram extends React.Component {
  render() {
    return (<EditSavedProgram obj={this.props.obj} />);
  }
}*/

import { connect } from 'react-redux';
import { expandSavedProgram } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  onExpand: id => {
    dispatch(expandSavedProgram(id));
  }
});

class Container extends React.Component {
  // TODO: need to repurpose "editing" and add a new "editing name"
  // or even a sub-object: name{text, buffer, editing}
  render() {
    if (this.props.obj === undefined)
    {
      return (<div>Error</div>);
    }
    // console.dir(this.props.obj)
    let program;
    const id = this.props.obj.id || 0;
    console.log(this.props.obj.id);
    if (this.props.obj.editing) {
      program = (<EditSavedProgram obj={this.props.obj} />);
    } else {
      console.log(`Passing id (${id}) to onExpand`)
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

export default SavedProgram;
