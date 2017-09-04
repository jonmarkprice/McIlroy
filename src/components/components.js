// Presentational components

import React from 'react';
import ProgramRow from './ProgramRow';
import ProgramCanvas from '../containers/containers';
// import PropTypes from 'prop-types'; // TODO need?

// TODO add onclick()'s

// possibly (later) divide into categories, such as
// math, lists, etc. or into built-in and derived
const FUNCTIONS = [
  ':', '+', '-', '*', '/', '^', '%', 'apply',
  'and', 'capitalize', 'concat', 'cond', 'cons',
  'equals', 'id', 'length', 'map', 'not', 'or',
  'reduce', 'split', 'succ'
];

const Input = () => (
  <div id="data" className="box">
    <h2>Input</h2>
    <div className="input-item">"Hello"</div>
  </div>
)

const Info = () => (
  <div id="information" className="box">
    <h2>Info</h2>
  </div>
);

const Execution = () => (
  <div id="execution" className="box">
    <h2>Execution</h2>
    <ProgramRow program={[]} />
  </div>
);

const Program = () => (
  <div id="program" className="box">
    <ProgramCanvas />
    <Execution />
  </div>
);

const Functions = () => {
  let fns = [];
  FUNCTIONS.forEach(fn => {
    fns.push(<button className="function" key={fn}>
      {fn}</button>);
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
        <button className="value">True</button>
        <button className="value">False</button>
        <button className="value">[ ]</button>
        <button className="value">0</button>
      </div>
    </div>
  );
}

const Palette = () => (
  <div id="palette" className="box">
    <Functions />
    <Info />
  </div>
);

const Interpretter = () => (
  <div className="interpretter">
    <Input />
    <Program />
    <Palette />
    { /* // Later: <Aliases> or <Definitions> */ }
  </div>
);

export default Interpretter;
