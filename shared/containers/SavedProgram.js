const React = require('react');
const EditSavedProgram = require('../containers/EditSavedProgram');
const { connect } = require('react-redux');
// const { expandSavedProgram } = require('../actions/saved');
const { pushFunction } = require('../actions/program-canvas');

const mapDispatchToProps = dispatch => ({
  // 
  // onExpand: id => {
  //  dispatch(expandSavedProgram(id));
  //},
  addTokenToCanvas: token => {
    dispatch(pushFunction(token));
  }
});

class Container extends React.Component {
  render() {
    const alias = {
      name: this.props.obj.name,
      expansion: this.props.obj.program
    };
    return (
      <div  className="function" 
        // onClick={() => this.props.} // pass id?
        onDoubleClick={() => this.props.addTokenToCanvas(alias)}>
        {this.props.obj.name}
      </div>
    );
  }
}

const SavedProgram = connect(undefined, mapDispatchToProps)(Container);
module.exports = SavedProgram;
