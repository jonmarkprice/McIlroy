import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//import './index.css'
import app from './reducers';
import Interpretter from './components/components';
import { pushInput, displayFunction } from './actions';

let store = createStore(app);

render(
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('root')
);

// dispatch some actions
store.dispatch(pushInput({
  label : '1',
  data  : 1
}));
store.dispatch(pushInput({
  label : '[1, 2, 3]',
  data  : [1, 2, 3]
}));
store.dispatch(pushInput({
  label : '[true, false]',
  data  : [true, false]
}));
store.dispatch(pushInput({
  label : '"hello"',
  data  : ['h', 'e', 'l', 'l', 'o']
}));

store.dispatch(displayFunction('Nothing selected.'));
