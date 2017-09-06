import React from 'react';
import { connect } from  'react-redux';
import { pushFunction } from '../actions';

// Possibly (later) divide into categories, such as
// math, lists, etc. or into built-in and derived
const FUNCTIONS = [
  ':', '+', '-', '*', '/', '^', '%', 'apply',
  'and', 'capitalize', 'concat', 'cond', 'cons',
  'equals', 'id', 'length', 'map', 'not', 'or',
  'reduce', 'split', 'succ'
];
const VALUES = ['True', 'False', '[ ]', '0'];

const FunctionPalette = ({onFunctionClick}) => {
  let fns     = [],
      values  = [];
  FUNCTIONS.forEach(fn => {
    fns.push(<button className="function" key={fn}
      onClick={() => onFunctionClick(fn)}>
        {fn}
      </button>);
  });
  VALUES.forEach(value => {
    values.push(
      <button className="value" key={value}
              onClick={() => onFunctionClick(value)}>
        {value}
      </button>);
  });
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
