import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-native-session';

import userService from 'services/userService';

export const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const login = user => async dispatch => {
  try {
    const { body } = await userService.login({ user });
    await sessionService.saveUser(body.user);
    dispatch(loginSuccess());
  } catch (err) {
    throw new SubmissionError({
      _error: err.error,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await userService.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
    dispatch(logoutSuccess());
  } catch (err) {
    throw err;
  }
};

export const signUp = user => async () => {
  try {
    const { body } = await userService.signUp({ user });
    sessionService.saveUser(body.user);
  } catch (err) {
    throw new SubmissionError({
      _error: err.error,
    });
  }
};
