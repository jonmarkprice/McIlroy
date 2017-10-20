import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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
