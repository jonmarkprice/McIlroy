const React = require('react');
const ProgramCanvas = require('../containers/ProgramCanvas');
const Execution = require('../containers/Execution');

const Program = () => (
  <div id="program" className="container">
    <ProgramCanvas />
    <Execution />
  </div>
);

module.exports = Program;
