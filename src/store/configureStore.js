import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import AppReducer from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, { type }) => !_.startsWith(type, '@@redux-form'),
    stateTransformer: state => (Iterable.isIterable(state) ? state.toJS() : state)
  });
  const middewares = [
    thunkMiddleware,
    logger
  ];

  const store = createStore(AppReducer, initialState, applyMiddleware(...middewares));

  return store;
}
