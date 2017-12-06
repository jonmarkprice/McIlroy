const React   = require('react');
const display = require('../parser/display');

const Token = ({text, classList=[]}) => (
  <div className={`item ${classList.join(' ')}`}>
    {display(text)}
  </div>
);

module.exports = Token;
