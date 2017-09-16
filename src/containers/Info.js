import React from 'react';
import { connect } from 'react-redux';

const InfoPane = ({displayed}) => (
  <div id="information" className="box">
    <h2>Info</h2>
    <h3 id="function-name">{displayed}</h3>
  </div>
);

const mapStateToProps = (state) => ({
  displayed: state.displayed
});

const Info = connect(mapStateToProps, undefined)(InfoPane);

export default Info;
