const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const rootReducer = require('./reducers');

function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunkMiddleware)
  );
}

module.exports = configureStore;
