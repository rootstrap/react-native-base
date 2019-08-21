import { combineReducers } from 'redux';
import { sessionReducer as session } from 'redux-react-native-session';
import actionStatus from 'reducers/statusReducer';

const AppReducer = combineReducers({
  session,
  actionStatus,
});

export default AppReducer;
