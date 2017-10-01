import React from 'react';
import { connect } from 'react-redux';

// TODO rename to SavedProgram
// import EditSavedProgram from './EditSavedProgram';
import SavedProgram from './SavedProgram';

const mapStateToProps = state => ({
  programs: state.saved
})
// [...programs.values()].map([_, p] => (<Aliases obj={p} key={p.id}/>))
// { Array.from(programs.values()).map((p, index) => (<Aliases obj={p} key={index}/>)) }
const Container = ({programs}) => (
  <div id="aliases" className="box">
    <h2>Saved Programs</h2>
    { Array.from(programs.values()).map(p => (<SavedProgram obj={p} key={p.id}/>)) }
  </div>
);

const SavedProgramList = connect(mapStateToProps, undefined)(Container);

export default SavedProgramList;
