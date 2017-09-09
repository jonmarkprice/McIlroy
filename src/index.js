import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css'
import app from './reducers';
import Interpretter from './components/components';
import { pushInput } from './actions';

let store = createStore(app);

render(
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('root')
);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// dispatch some actions
store.dispatch(pushInput('"Hello"'));
store.dispatch(pushInput('1'));

unsubscribe();
