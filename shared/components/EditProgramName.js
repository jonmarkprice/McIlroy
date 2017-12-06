const React = require('react');

const EditProgramName = ({program_id, name, onNameUpdate, onNameChange}) => (
  <form className="dbg" onSubmit={event => {
    event.preventDefault();
    onNameUpdate(program_id);
  }}>
    <input type="text" id="rename" defaultValue={name} onChange={event =>
      onNameChange(program_id, event.target.value)} />
    <input type="submit" value="Update" />
  </form>
);

module.exports = EditProgramName;
