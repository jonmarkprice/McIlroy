import React from 'react';
//import ProgramRow from '../components/ProgramRow';
import Token from '../components/Token';
import { connect } from  'react-redux';
// import { clearCanvas } from '../actions';
import library from '../lib/library';
import literals from '../lib/literals';

const mapStateToProps = state => ({
  program: state.program
});

const parseToken = (token) => {
  if (literals.has(token)) {
    // Interpret each token as well
    return literals.get(token);
  }
  else if (library.has(token)) {
    return library.get(token);
  }
}

const parse = (list) => list.reduce((agg, token, index, array) => {
  // agg is {stack: (unconsumed tokens)], [print list])
  if (token === ':') {
    const func = agg.stack.pop();
    const args = agg.stack.slice(-func.arity);
    const value = func.fn.apply(null, args);

    for (let i = 0; i < func.arity; i += 1) {
      agg.stack.pop(); // pop off used elements
    }
    agg.steps.push({
      left  : agg.stack.slice(),
      value : value,
      right : array.slice(index + 1)
    });
    agg.stack.push(value);
  }
  else {
    agg.stack.push(parseToken(token));
  }
  return agg;
}, {stack: [], steps: []});

function display(obj) {
  if (Array.isArray(obj)) {
    console.log("I'm an array")

    // If list is empty
    if (obj.length === 0) {
      return '[ ]';
    }
    // For singleton lists
    else if (obj.length === 1) {
      return `[${display(obj[0])}]`
    }
    // For lists of length two or greater
    else {
      const lastIndex = obj.length - 1;
      return obj.reduce((agg, elem, index) => {
        if (agg === '') {
          // For first item
          return '[' + display(elem);
        }
        else if (index === lastIndex) {
          // For last item
          return agg + ', ' + display(elem) + ']';
        }
        else {
          return agg + ', ' + display(elem);
        }
      }, '');
    }
  }
  else {
    return obj.toString();
  }
}


class ExecutionRows extends React.Component {

  render() {
    let rows = [];
    //let n = 0;
    //let pairs = [["<data>", "||", "<...>"]];
    //let contents = ["<data>", "||"].concat(this.props.program);
    //let steps = [contents];
    //let tokens = [];
    //rows.push(<ProgramRow program={contents} key='init' />);
    rows.push(<div className="row" key="init">
        {this.props.program.map((text, index) => <Token text={text} key={index} />)}
    </div>);
    const result = parse(this.props.program);

    // Display
    result.steps.forEach((step, stepIndex) => {
      console.log(step);
      const offset = step.left.length;

      // Wrap tokens
      const newToken = <Token text={display(step.value)}
                              classList={['em']} key='new' />;
      const consTokens = step.left.map((text, index) => (
        <Token text={text} classList={['skip']} key={index} />
      ));

      const remTokens = step.right.map((text, index) => (
        <Token text={text} key={index + offset} />
      ));
      //consTokens.push(resultToken);
      const joined = consTokens.concat(newToken, remTokens);

      console.log('consTokens:')
      console.log(consTokens)
      console.log(step.left.length)

      console.log('remTokens: ')
      console.log(remTokens)
      console.log(step.right.length)

      console.log(newToken)
      console.log(joined)
      console.log(Array.isArray(joined))
      console.log(joined.length)

      for (let elem of joined) {
        console.log(elem)
      }
      //steps.push([joined]); // dealing with data
      //pairs.push([consumed, remaining]);
      //n += 1;

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
/*
    let stack = [];
    //let rows  = [];
    let index = 0;
    // for (let token of this.props.program) {
    while (unconsumed.length > 0 || index > 10) {
      let token = unconsumed.shift();

      // if (! isNaN(Number(token))) {
      //  stack.push(Number(token));
      //}
      if (literals.has(token)) {
        // Interpret each token as well
        stack.push(literals.get(token));
      }
      else if (library.has(token)) {
        stack.push(library.get(token));
      }
      else if (token === ':') {
        const func = stack.pop();
        const args = stack.slice(-func.arity);

        // Pop off used elements
        for (let i = 0; i < func.arity; i += 1) {
          stack.pop();
        }
        stack.push(func.fn.apply(null, args));
        index += 1;

        const contents = stack.concat('||', unconsumed);
        // rows.push(<p key={index}>{contents}</p>)
        console.log(contents)
      }
    }
    */

const Execution = connect(mapStateToProps, undefined)(ExecutionRows);

export default Execution;
