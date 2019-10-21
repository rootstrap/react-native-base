import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from 'reducers/sessionReducer';
import actionStatus from 'reducers/statusReducer';

const AppReducer = combineReducers({
  form,
  session,
  actionStatus,
});

export default AppReducer;
