import React from 'react';

const Token = ({text, classList=[]}) => (
  <div className={`item ${classList.join(' ')}`}>
    {text}
  </div>
);

export default Token;
