const React = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { setEditing } = require('../actions/edit');

const dbg = console.log;

const mapStateToProps = state => ({
  program: state.saved.programs[state.displayed.id].program,
  name: state.displayed.name,
  id: state.displayed.id
});

const mapDispatchToProps = dispatch => ({
  edit: id => {
    dbg(`mapping setEding with id ${id}`);
    dispatch(setEditing(id));
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
