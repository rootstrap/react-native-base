import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunkMiddleware } from '@rootstrap/redux-tools';
import { createLogger } from 'redux-logger';
import createDebugger from 'redux-flipper';
import { persistStore, persistReducer } from 'redux-persist';
import AppReducer from '../reducers';

/* eslint-disable */
// Enables redux dev tools -->
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-enable */
const persistStateKeys = ['stockFeed'];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // alternative to local-storage, see: https://reactnative.dev/docs/asyncstorage
    whitelist: [...persistStateKeys], // state keys to be persisted to device cache
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

    const persistanceReducer = persistReducer(persistConfig, AppReducer);

    const store = createStore(
        persistanceReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    const persistor = persistStore(store);

    return { store, persistor };
}
