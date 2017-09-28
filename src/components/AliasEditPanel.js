import React from 'react';

const AliasEditPanel = ({name, onNameUpdate, onNameChange}) => (
  <form onSubmit={event => {
    event.preventDefault();
    onNameUpdate();
  }}>
    <input type="text" id="rename" defaultValue={name} onChange={event =>
      onNameChange(event.target.value)} />
    <input type="submit" value="Update" />
  </form>
);

export default AliasEditPanel;
