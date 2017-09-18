import React from 'react';
import { connect } from 'react-redux';
import descriptions from '../lib/descriptions';

const InfoPane = ({displayed}) => (
  <div id="information" className="box">
    <h2>Info</h2>
    <h3 id="function-name">{displayed}</h3>
    <p>{(() => {
        if (descriptions.has(displayed)) {
          return descriptions.get(displayed).text;
        }
        else {
          console.log(`Not found ${displayed}`)
          return '';
        }
      })()}
    </p>
  </div>
);

const mapStateToProps = (state) => ({
  displayed: state.displayed
});

const Info = connect(mapStateToProps, undefined)(InfoPane);

export default Info;
