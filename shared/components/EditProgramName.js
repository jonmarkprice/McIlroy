const React = require('react');

class EditProgramName extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    console.log("-- FORM SUMBITTED --");
    const newName = this.nameField.value;
    console.log(`new name: ${newName}`);
    this.props.onNameUpdate(this.props.program_id, this.props.name, newName); 
  }
  
  render() {
    // const {name} = this.props;
    return (
      <form className="dbg"
        onSubmit={event => {
          event.preventDefault();
          //onNameUpdate(program_id, name, 'TODO');
          this.nameUpdate(); // call ref. function
        }}>
        <input type="text" id="rename"
          defaultValue={this.props.name}
          ref={x => { this.nameField = x; }} />
        <input type="submit" value="Update" />
      </form>
    );
  }
}

module.exports = EditProgramName;
