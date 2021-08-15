import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunkMiddleware } from '@rootstrap/redux-tools';
import { createLogger } from 'redux-logger';
import createDebugger from 'redux-flipper';
import { persistStore, persistReducer } from 'redux-persist';
import AppReducer from '../reducers';

/* eslint-disable */
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // alternative to local-storage, see: https://reactnative.dev/docs/asyncstorage
    whitelist: ['stockFeed'], // state slices to be persisted to device cache
};

export default function configureStore(initialState: object) {
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
