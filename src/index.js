import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';
import { pushFunction } from './actions';
import Interpretter from './components/components';
import './index.css'

let store = createStore(app);

render(
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('root')
);

// console.log(store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// dispatch some actions
store.dispatch(pushFunction('1'));
store.dispatch(pushFunction('2'));
store.dispatch(pushFunction('+'));
store.dispatch(pushFunction(':'));

unsubscribe();
