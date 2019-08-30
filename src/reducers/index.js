import { combineReducers } from 'redux';
import session from 'reducers/sessionReducer';
import actionStatus from 'reducers/statusReducer';

const AppReducer = combineReducers({
  session,
  actionStatus,
});

export default AppReducer;
