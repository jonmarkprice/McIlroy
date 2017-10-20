import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

//const App = <p>Hello React!</p>;
class AppComponent extends React.Component {
  render() {
    return <p>Hello {this.props.addressee}</p>;
  }
}

const mapStateToProps = (state) => ({
  addressee: state
})

const App = connect(mapStateToProps)(AppComponent);

export default App;
