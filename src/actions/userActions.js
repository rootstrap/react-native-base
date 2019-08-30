import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-native-session';

import userService from 'services/userService';

export const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
};

const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS,
});

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

const logoutError = error => ({
  type: actionTypes.LOGOUT_ERROR,
  error,
});

const signUpSuccess = () => ({
  type: actionTypes.SIGN_UP_SUCCESS,
});

const signUpRequest = () => ({
  type: actionTypes.SIGN_UP_REQUEST,
});

const signUpError = error => ({
  type: actionTypes.SIGN_UP_ERROR,
  error,
});

export const login = user => async dispatch => {
  try {
    dispatch(loginRequest());
    const { data } = await userService.login({ user });
    await sessionService.saveUser(data.user);
    dispatch(loginSuccess());
  } catch (err) {
    dispatch(loginError(err));
    throw new SubmissionError({
      _error: err.error,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest());
    await userService.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutError(err));
    throw err;
  }
};

export const signUp = user => async dispatch => {
  try {
    dispatch(signUpRequest());
    const { data } = await userService.signUp({ user });
    sessionService.saveUser(data.user);
    dispatch(signUpSuccess());
  } catch (err) {
    dispatch(signUpError(err));
    throw new SubmissionError({
      _error: err.error,
    });
  }
};
