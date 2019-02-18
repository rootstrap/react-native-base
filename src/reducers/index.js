import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-native-session';

const AppReducer = combineReducers({
  form,
  session
});

export default AppReducer;
