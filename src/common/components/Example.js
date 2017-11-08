const React      = require('react');
const ProgramRow = require('./ProgramRow');
const Token      = require('./Token');

const Example = ({program, result}) => (
  <div id="example">
    <h4>Example</h4>
    <ProgramRow program={program} />
    <h5>Result</h5>
    <Token text={result} />
  </div>
);

module.exports = Example;
