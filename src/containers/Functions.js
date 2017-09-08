import React from 'react';
import library from '../lib/library';
import literals from '../lib/literals';
import { connect } from  'react-redux';
import { pushFunction } from '../actions';

const FunctionPalette = ({onFunctionClick}) => {
  const appOp = <button className="function" key=":"
                        onClick={() => onFunctionClick(':')}>:</button>
  let fns     = [appOp],
      values  = [];
  for (let fn of library.keys()) {
    fns.push(
      <button className="function" key={fn}
              onClick={() => onFunctionClick(fn)}>
        {fn}
      </button>);
  }
  for (let value of literals.keys()) {
    values.push(
      <button className="value" key={value}
              onClick={() => onFunctionClick(value)}>
        {value}
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
