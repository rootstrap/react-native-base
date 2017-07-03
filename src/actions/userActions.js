import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-native-session';

import userApi from '../api/userApi';
import * as types from './actionTypes';
import { alertErrors } from '../utils/helpers';

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

export const login = user =>
  dispatch =>
    userApi.login({ user }).then((data) => {
      sessionService.saveSession(data)
      .then(() => {
        dispatch(loginSuccess());
        getUserData();
      });
    }, (err) => {
      alertErrors('loginError');
    });

export const getUserData = user =>
  userApi.getUserData().then((data) => {
    sessionService.saveUser(data)
  });

export const logout = () =>
  (dispatch) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    dispatch(logoutSuccess());
  };
