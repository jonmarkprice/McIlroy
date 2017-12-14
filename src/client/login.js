// TODO: use React here
const React = require('react');
const ReactDOM = require('react-dom');
const Token = require('../../build/components/Token');

console.log("Logging on...");
// const Login = <div>User name: </div>;
class Login extends React.Component {
  render() {
    return (
      <div>
        <div>User name: </div>
        <Token text='Test' />
      </div>
    );
  }
}

// should be able to use JSX
ReactDOM.render(
  <Login />,
  document.getElementById('app')
);
