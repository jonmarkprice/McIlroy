import React from 'react';
import { connect } from 'react-redux';

// TODO rename to SavedProgram
import Aliases from './Aliases';

const mapStateToProps = state => ({
  programs: state.saved
})
// [...programs.values()].map([_, p] => (<Aliases obj={p} key={p.id}/>))
// { Array.from(programs.values()).map((p, index) => (<Aliases obj={p} key={index}/>)) }
const Container = ({programs}) => (
  <div id="aliases" className="box">
    <h2>Aliases</h2>
    { Array.from(programs.values()).map(p => (<Aliases obj={p} key={p.id}/>)) }
  </div>
);

const SavedProgramList = connect(mapStateToProps, undefined)(Container);

export default SavedProgramList;
