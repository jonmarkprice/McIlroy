const React = require('react');
const Functions = require('../containers/Functions');
const Input = require('../containers/Input');
const Info = require('../containers/Info');
const SavedProgramList = require('../containers/SavedProgramList');

const Palette = () => (
  <div id="palette" className="container">
    <Input />
    <Functions />
    <SavedProgramList />
    <Info />
  </div>
);

module.exports = Palette;
