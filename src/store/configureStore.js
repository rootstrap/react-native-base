import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import AppReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware
  ];

  if (__DEV__) {
    const logger = createLogger({
      collapsed: true,
      predicate: (getState, { type }) => !_.startsWith(type, '@@redux-form'),
      stateTransformer: state => (Iterable.isIterable(state) ? state.toJS() : state)
    });
    middlewares.push(logger);
  }

  const store = createStore(AppReducer, initialState, applyMiddleware(...middlewares));

  return store;
}
