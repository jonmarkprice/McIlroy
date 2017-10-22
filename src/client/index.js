import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Interpretter from '../common/components/components';
import reducer from '../common/reducers';

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
