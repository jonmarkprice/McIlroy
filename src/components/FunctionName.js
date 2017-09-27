import React from 'react';

const FunctionName = ({name, onEditName}) => (
  <div>
    <h3>{name}</h3>
    <button onClick={onEditName}>
      Edit Name
    </button>
  </div>
);

export default FunctionName;
