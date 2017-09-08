import React from 'react';
import { connect } from  'react-redux';
import Token from '../components/Token';
import display from '../lib/display';
import parse from '../lib/parser';

const mapStateToProps = state => ({
  program: state.program
});

class ExecutionRows extends React.Component {
  render() {
    let rows = [];

    // Populate rows
    const rowData = this.props.program.map((text, index) =>
      <Token text={text} key={index} />);
    rows.push(<div className="row" key="init">{rowData}</div>);
    const result = parse(this.props.program);

    // Populate steps
    result.steps.forEach((step, stepIndex) => {
      // Wrap tokens
      const offset = step.left.length;
      const newToken = <Token text={display(step.value)}
                              classList={['em']} key='new' />;
      const consumedTokens = step.left.map((text, index) => (
        <Token text={display(text)} classList={['skip']} key={index} />
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
