const React           = require('react');
const { render }      = require('react-dom');
const { Provider }    = require('react-redux');
const { createStore } = require('redux');
const Interpretter    = require('../../common/src/components/components');
const reducer         = require('../../common/src/reducers');

console.log('Started successfully...');

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState);

render(
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('app')
);
