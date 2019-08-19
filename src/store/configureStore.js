import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import AppReducer from 'reducers';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];

  if (__DEV__) {
    const logger = createLogger({
      collapsed: true,
      predicate: (getState, { type }) => !_.startsWith(type, '@@redux-form'),
    });
    middlewares.push(logger);
  }

  const store = createStore(
    AppReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
}
