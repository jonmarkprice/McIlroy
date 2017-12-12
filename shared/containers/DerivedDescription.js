const React = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { setEditing } = require('../actions/edit');
const { deleteSavedProgram } = require('../actions/saved-async');
const dbg = console.log;
const { prop } = require('ramda');

const mapStateToProps = state => ({
  program: prop('program',
            state.saved.programs[state.displayed.id]) || [],
  name: state.displayed.name,
  id: state.displayed.id
});

const mapDispatchToProps = dispatch => ({
  edit: id => {
    dbg(`mapping setEding with id ${id}`);
    dispatch(setEditing(id));
  },
  del: (id, name) => {
    dbg(`mapping delete with id, name (${id}, ${name}).`);
    dispatch(deleteSavedProgram(id, name));
  }
});

class Container extends React.Component {
  render() {
    return (
      <div id="information" className="box">
        <h2>Info</h2>
        <button id="edit-named-function"
          onClick={() => this.props.edit(this.props.id)}>
          Edit
        </button>
        <button id="delete-derived"
          onClick={() => this.props.del(this.props.id, this.props.name)}>
          Delete
        </button>
        <h3 id="function-name">{this.props.name}</h3>
        <p>Definition</p>
        <ProgramRow program={this.props.program} />
    </div>     
    );
  }
}

// TODO: connect for Edit button
const DerivedDescription = connect(mapStateToProps, mapDispatchToProps)
  (Container);

module.exports = DerivedDescription;
