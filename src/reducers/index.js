import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { sessionReducer as session } from 'redux-react-native-session';

const AppReducer = combineReducers({
  form,
  session
});

export default AppReducer;
