const React = require('react');
const { values } = require('ramda');
const { connect } = require('react-redux');
const SavedProgram = require('./SavedProgram');
const { openNew } = require('../actions/edit');

const dbg = require("../dbgconf")("container:save-program-list");

const mapStateToProps = state => ({
  programs: state.saved.programs,
  id: state.saved.next_id,
  canvas: state.program
})

// This may need an id...
const mapDispatchToProps = dispatch => ({
  create: (id, program) => {dispatch(openNew(id, program))}
});

//const Container = ({programs, create, next_id}) => (
class Container extends React.Component {
  render() {
    const {id, programs, create, canvas} = this.props;
    dbg("Programs: %O", programs);
    return (
      <div id="aliases" className="box">
        <button id="new-program" onClick={() => create(id, canvas)}>
          New
        </button>
        <h2>Saved Programs</h2>
        { values(programs).map((p, index) =>
            <SavedProgram obj={p} key={index} />) }
      </div>
    );
  }
}

const SavedProgramList = connect(mapStateToProps, mapDispatchToProps)(Container);
module.exports = SavedProgramList;
