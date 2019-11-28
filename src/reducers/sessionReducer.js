import { createReducer } from '@rootstrap/redux-tools';
import { loginSuccess, signUpSuccess, logoutSuccess, updateSession } from 'actions/userActions';

const initialState = {
  user: null,
  info: null,
};

const handleLoginSuccess = (state, { user }) => {
  state.user = user;
};

const handleLogoutSuccess = () => {
  return initialState;
};

const handleUpdateSession = (state, { session }) => {
  state.info = session;
};

export default createReducer(initialState, {
  [loginSuccess]: handleLoginSuccess,
  [logoutSuccess]: handleLogoutSuccess,
  [signUpSuccess]: handleLoginSuccess,
  [updateSession]: handleUpdateSession,
});
