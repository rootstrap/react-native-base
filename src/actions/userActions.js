import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-native-session';

import userApi from '../api/userApi';
import * as types from './actionTypes';

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
      if(err.errors) {
        throw new SubmissionError({
          _error: err.errors[0]
        });
      }
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
