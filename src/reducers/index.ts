import { combineReducers } from 'redux';
import session from '../reducers/sessionReducer';
import stockFeed from '../reducers/stocksFeedReducer';
import { statusReducer } from '@rootstrap/redux-tools';

const AppReducer = combineReducers({
    session,
    stockFeed,
    actionStatus: statusReducer,
});

export type RootState = ReturnType<typeof AppReducer>;

export default AppReducer;
