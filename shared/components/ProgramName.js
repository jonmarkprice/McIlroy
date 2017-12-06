const React = require('react');

const ProgramName = ({name, onEditName}) => (
  <div className="dbg">
    <h3 className="saved-function-name">{name}</h3>
    <button onClick={onEditName}>
      Edit Name
    </button>
  </div>
);

module.exports = ProgramName;
