const React = require('react');
const { connect } = require('react-redux');

// TODO rename to SavedProgram
// import EditSavedProgram from './EditSavedProgram';
const SavedProgram = require('./SavedProgram');

const mapStateToProps = state => ({
  programs: state.saved
})
// [...programs.values()].map([_, p] => (<Aliases obj={p} key={p.id}/>))
// { Array.from(programs.values()).map((p, index) => (<Aliases obj={p} key={index}/>)) }

// Getting error: "programs.values is not a function"
// Map has 3 accessors .values(), .keys() and ___(?)
// If programs was an object instead of a map, we would use a for..in loop
/*
(() => {
  let list = [];
  let index = 0;
  for (let program in programs) {
    list.push(<SavedProgram obj={program} key={index} />);
  }
  return list;
})() */

const Container = ({programs}) => (
  <div id="aliases" className="box">
    <h2>Saved Programs</h2>
    { Object.values(programs).map((p, index) => <SavedProgram obj={p} key={index} />) }
  </div>
);

const SavedProgramList = connect(mapStateToProps, undefined)(Container);
module.exports = SavedProgramList;
