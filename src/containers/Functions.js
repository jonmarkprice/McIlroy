import React from 'react';
import library from '../lib/library';
import literals from '../lib/literals';
import { connect } from 'react-redux';
import { pushFunction } from '../actions';

const FunctionPalette = ({onFunctionClick}) => {
  const appOp = <div className="function" key=":"
                        onClick={() => onFunctionClick(':')}>:</div>
  let fns     = [appOp],
      values  = [];
  for (let fn of library.keys()) {
    fns.push(
      <div className="function" key={fn}
              onClick={() => onFunctionClick(fn)}>
        {fn}
      </div>);
  }
  for (let name of literals.keys()) {
    values.push(
      <button className="value" key={name}
              onClick={() => onFunctionClick(literals.get(name))}>
        {name}
      </button>);
  }
  return (
    <div id="functions" className="box">
      <h2>Palette</h2>
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
    onFunctionClick: text => {
      dispatch(pushFunction(text));
    }
  };
};

const Functions = connect(
  state => ({}),
  mapDispatchToProps
)(FunctionPalette);

export default Functions;
