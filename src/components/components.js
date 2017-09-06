// Presentational components

import React from 'react';
// import ProgramRow from './ProgramRow';
import ProgramCanvas from '../containers/ProgramCanvas';
import Functions from '../containers/Functions';
import Execution from '../containers/Execution';
// import PropTypes from 'prop-types'; // TODO need?

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

const Program = () => (
  <div id="program" className="box">
    <ProgramCanvas />
    <Execution />
  </div>
);

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
