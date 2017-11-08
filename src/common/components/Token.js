const React   = require('react');
const display = require('../lib/display.js');

const Token = ({text, classList=[]}) => (
  <div className={`item ${classList.join(' ')}`}>
    {display(text)}
  </div>
);

module.exports = Token;
