import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionReducer as session } from 'redux-react-native-session';
import nav from './navReducer';

const AppReducer = combineReducers({
  nav,
  form,
  session
});

export default AppReducer;
