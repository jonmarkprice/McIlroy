import React from 'react';
import ProgramRow from './ProgramRow';
import Token from './Token';

const Example = ({program, result}) => (
  <div id="example">
    <h4>Example</h4>
    <ProgramRow program={program} />
    <h5>Result</h5>
    <Token text={result} />
  </div>
);

export default Example;
