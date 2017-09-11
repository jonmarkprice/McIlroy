import React from 'react';
import display from '../lib/display.js'

const Token = ({text, classList=[]}) => (
  <div className={`item ${classList.join(' ')}`}>
    {display(text)}
  </div>
);

export default Token;
