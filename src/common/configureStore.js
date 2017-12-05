const { createStore, applyMiddleware } = require('redux');
// const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk').default;
const rootReducer = require('../../common/src/reducers');

function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    applyMiddleware(thunkMiddleware)
  );
}

module.exports = configureStore;
