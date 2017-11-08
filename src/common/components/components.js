// Presentational components
const React = require('react');
const ProgramCanvas = require('../containers/ProgramCanvas');
const Functions = require('../containers/Functions');
const Execution = require('../containers/Execution');
const Input = require('../containers/Input');
const Info = require('../containers/Info');
const SavedProgramList = require('../containers/SavedProgramList');
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
    <SavedProgramList />
    <Info />
  </div>
);

const Interpretter = () => (
  <div className="interpretter">
    <Palette />
    <Program />
  </div>
);

module.exports = Interpretter;
