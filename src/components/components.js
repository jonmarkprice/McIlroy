// Presentational components
import React from 'react';
import ProgramCanvas from '../containers/ProgramCanvas';
import Functions from '../containers/Functions';
import Execution from '../containers/Execution';
import Input from '../containers/Input';
// import PropTypes from 'prop-types'; // TODO need?

const Info = () => (
  <div id="information" className="box">
    <h2>Info</h2>
  </div>
);

const Program = () => (
  <div id="program" className="container">
    <ProgramCanvas />
    <Execution />
  </div>
);

const Palette = () => (
  <div id="palette" className="container">
    <Functions />
    <Info />
  </div>
);

const Interpretter = () => (
  <div className="interpretter">
    <Palette />
    <Input />
    <Program />
    { /* // Later: <Aliases> or <Definitions> */ }
  </div>
);

export default Interpretter;
