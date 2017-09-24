// Presentational components
import React from 'react';
import ProgramCanvas from '../containers/ProgramCanvas';
import Functions from '../containers/Functions';
import Execution from '../containers/Execution';
import Input from '../containers/Input';
import Info from '../containers/Info';
import Aliases from '../containers/Aliases';
// import PropTypes from 'prop-types'; // TODO need?

const Program = () => (
  <div id="program" className="container">
    <ProgramCanvas />
    <Execution />
  </div>
);

const Palette = () => (
  <div id="palette" className="container">
    <Input /> {/* Maybe move to Program */ }
    <Functions />
    <Aliases />
    <Info />
  </div>
);

const Interpretter = () => (
  <div className="interpretter">
    <Palette />
    <Program />
  </div>
);

export default Interpretter;
