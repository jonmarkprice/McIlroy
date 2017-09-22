import React from 'react';
import library from '../lib/library';
import syntax from '../lib/syntax';
import literals from '../lib/literals';
import { connect } from 'react-redux';
import { pushFunction, displayFunction } from '../actions';

const FunctionPalette = ({addTokenToCanvas, displayInfo}) => {
  let fns     = [],
      values  = [];
  for (let op of syntax.keys()) {
    fns.push(
      <div className="function" key={op}
        onDoubleClick={() => addTokenToCanvas(op)}
        onClick={() => displayInfo(op)}>
        {op}
      </div>);
  }
  for (let fn of library.keys()) {
    fns.push(
      <div className="function" key={fn}
           onDoubleClick={() => addTokenToCanvas(fn)}
           onClick={() => displayInfo(fn)}>
        {fn}
      </div>);
  }
  for (let name of literals.keys()) {
    values.push(
      // XXX warning: Don't make functions withn a loop
      <div className="value" key={name}
              onDoubleClick={() => addTokenToCanvas(literals.get(name))}>
        {name}
      </div>);
  }
  return (
    <div id="functions" className="box">
      <h2>Palette</h2>
      <p className="important-notice">
        <em>Double click</em> to add to Canvas.
      </p>
      <div className="functions">
        <h3>Functions</h3>
        {fns}
      </div>
      <div className="values">
        <h3>Values</h3>
        {values}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addTokenToCanvas: text => {
      dispatch(pushFunction(text))
    },
    displayInfo: text => {
      dispatch(displayFunction(text))
    }
  };
};

const Functions = connect(
  state => ({}),
  mapDispatchToProps
)(FunctionPalette);

export default Functions;
