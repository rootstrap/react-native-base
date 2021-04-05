import { combineReducers } from 'redux';
import session from '../reducers/sessionReducer';
import { statusReducer } from '@rootstrap/redux-tools';

const AppReducer = combineReducers({
  session,
  actionStatus: statusReducer,
});

export type RootState = ReturnType<typeof AppReducer>;

export default AppReducer;
