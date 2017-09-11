import React from 'react';
import { connect } from  'react-redux';
import Token from '../components/Token';
import parse from '../lib/parser';

const mapStateToProps = state => ({
  program: state.program,
  inputData: state.input[state.selected].data
});

class ExecutionRows extends React.Component {
  render() {
    // The program applied to the data
    // NOTE: We use null for no input, so do not include.
    const input = this.props.inputData;
    const applied = (input !== null)
                  ? [input].concat(this.props.program)
                  : this.props.program;

    // Populate rows
    const rowData = applied.map((text, index) =>
      <Token text={text} key={index} />);
    let rows = [];
    rows.push(<div className="row" key="init">{rowData}</div>);

    // Populate steps
    const result = parse(applied);
    result.steps.forEach((step, stepIndex) => {
      // Wrap tokens
      const offset = step.left.length;
      const newToken = <Token text={step.value}
                              classList={['em']} key='new' />;
      const consumedTokens = step.left.map((text, index) => (
        <Token text={text} classList={['skip']} key={index} />
      ));
      const remainingTokens = step.right.map((text, index) => (
        <Token text={text} key={index + offset} />
      ));
      const joined = consumedTokens.concat(newToken, remainingTokens);

      // Fill row with step
      rows.push(<div className="row" key={stepIndex}>{joined}</div>);
    });

    return (
      <div id="execution" className="box">
        <h2>Execution</h2>
        {rows}
      </div>
    );
  }
}

const Execution = connect(mapStateToProps, undefined)(ExecutionRows);

export default Execution;
