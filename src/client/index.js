import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from '../common/app';

console.log('Started successfully...');
/*
const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

// TODO move this to common/reducers or similar
const reducer = (state = "world!", action) => {
  switch (action.type) {
    case 'TO_REACT':
      return 'React!';
    default:
      return state;
  }
}

// TODO: look up the exact args of this
const store = createStore(reducer, preloadedState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') // TODO double check
);
*/

render(<App />, document.getElementById('app'));
