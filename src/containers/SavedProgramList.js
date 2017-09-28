import React from 'react';
import { connect } from 'react-redux';

// TODO rename to SavedProgram
import Aliases from './Aliases';

const mapStateToProps = state => ({
  programs: state.saved
})
// [...programs.values()].map([_, p] => (<Aliases obj={p} key={p.id}/>))
const Container = ({programs}) => (
  <div id="aliases" className="box">
    <h2>Aliases</h2>
    <div className="box">
    { Array.from(programs).map(p => (<Aliases obj={p[1]} key={p[1].id}/>)) }
    </div>
  </div>
);

const SavedProgramList = connect(mapStateToProps, undefined)(Container);

export default SavedProgramList;
