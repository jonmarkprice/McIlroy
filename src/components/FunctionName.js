import React from 'react';

const FunctionName = ({name, onEditName}) => (
  <div className="dbg">
    <h3 className="saved-function-name">{name}</h3>
    <button onClick={onEditName}>
      Edit Name
    </button>
  </div>
);

export default FunctionName;
