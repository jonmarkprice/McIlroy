const React = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { setEditing } = require('../actions/edit');
const { deleteSavedProgram } = require('../actions/saved-async');
const { prop } = require('ramda');
const dbg = require('../../src/common/dbgconf')('containers:derived-description');

const mapStateToProps = state => ({
  program: prop('program',
            state.saved.programs[state.displayed.id]) || [],
  name: prop('name', 
          state.saved.programs[state.displayed.id]) || '<deleted>',
  id: state.displayed.id,
  username  : state.user.name
});

const mapDispatchToProps = dispatch => ({
  edit: (id, name, program) => {
    dbg(`mapping setEding with id ${id}`);
    dispatch(setEditing(id, name, program));
  },
  del: (username, id, name) => {
    dbg(`mapping delete with id, name, user (${id}, ${name}, ${username}).`);
    dispatch(deleteSavedProgram(username, id, name));
  }
});

class Container extends React.Component {
  render() {
    const {username, id, name, program, edit, del} = this.props;
    dbg('Username: %s', username);
    return (
      <div id="information" className="box">
        <h2>Info</h2>
        <button id="edit-program" onClick={() => edit(id, name, program)}>
          Edit
        </button>
        <button id="delete-program" onClick={() => del(username, id, name)}>
          Delete
        </button>
        <h3 id="function-name">{name}</h3>
        <p>Definition</p>
        <ProgramRow program={program} />
    </div>     
    );
  }
}

// TODO: connect for Edit button
const DerivedDescription = connect(mapStateToProps, mapDispatchToProps)
  (Container);

module.exports = DerivedDescription;
