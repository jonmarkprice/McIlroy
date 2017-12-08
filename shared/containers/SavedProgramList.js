const React = require('react');
const { connect } = require('react-redux');
const SavedProgram = require('./SavedProgram');

const mapStateToProps = state => ({
  programs: state.saved.programs
})

const Container = ({programs}) => (
  <div id="aliases" className="box">
    <h2>Saved Programs</h2>
    { Object.values(programs).map((p, index) => <SavedProgram obj={p} key={index} />) }
  </div>
);

const SavedProgramList = connect(mapStateToProps, undefined)(Container);
module.exports = SavedProgramList;
