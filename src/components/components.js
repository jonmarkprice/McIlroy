// Presentational components
import React from 'react';
import ProgramCanvas from '../containers/ProgramCanvas';
import Functions from '../containers/Functions';
import Execution from '../containers/Execution';
import Input from '../containers/Input';
import Info from '../containers/Info';
// import PropTypes from 'prop-types'; // TODO need?

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
    <Input />
    <Program />
    <Palette />
    { /* // Later: <Aliases> or <Definitions> */ }
  </div>
);

export default Interpretter;
