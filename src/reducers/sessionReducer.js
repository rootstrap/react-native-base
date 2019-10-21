import createReducer from 'reducers/createReducer';
import { actionTypes } from 'actions/userActions';

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
  [actionTypes.LOGIN_SUCCESS]: handleLoginSuccess,
  [actionTypes.LOGOUT_SUCCESS]: handleLogoutSuccess,
  [actionTypes.SIGN_UP_SUCCESS]: handleLoginSuccess,
  [actionTypes.UPDATE_SESSION]: handleUpdateSession,
});
