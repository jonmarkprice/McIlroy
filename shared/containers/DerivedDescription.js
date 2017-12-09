const React = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');

const mapStateToProps = state => ({
  program: state.saved.programs[state.displayed.id].program,
  name: state.displayed.name
});
/*
const mapDispatchToProps = dispatch => ({
  edit: null
}) */

class Container extends React.Component {
  render() {
    return (
      <div id="information" className="box">
        <h2>Info</h2>
        <button id="edit-named-function">
        {/* onClick={this.props.edit} */}
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
const DerivedDescription = connect(mapStateToProps)(Container);

module.exports = DerivedDescription;