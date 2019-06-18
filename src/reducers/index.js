import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { sessionReducer as session } from 'redux-react-native-session';
import actionStatus from 'reducers/statusReducer';

const AppReducer = combineReducers({
  form,
  session,
  actionStatus
});

export default AppReducer;
