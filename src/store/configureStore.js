import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunkMiddleware } from '@rootstrap/redux-tools';
import { createLogger } from 'redux-logger';
import createDebugger from 'redux-flipper';
import { persistStore, persistReducer } from 'redux-persist';
import AppReducer from 'reducers';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['session'],
};

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];

  if (__DEV__) {
    middlewares.push(createDebugger());
    const logger = createLogger({
      collapsed: true,
    });
    middlewares.push(logger);
  }

  const persistedReducer = persistReducer(persistConfig, AppReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
