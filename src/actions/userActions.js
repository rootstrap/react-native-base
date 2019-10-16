import userService from 'services/userService';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  UPDATE_SESSION: 'UPDATE_SESSION',
};

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
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

const signUpSuccess = user => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  user,
});

const signUpRequest = () => ({
  type: actionTypes.SIGN_UP_REQUEST,
});

const signUpError = error => ({
  type: actionTypes.SIGN_UP_ERROR,
  error,
});

export const updateSession = session => ({
  type: actionTypes.UPDATE_SESSION,
  session,
});

export const login = user => async dispatch => {
  try {
    dispatch(loginRequest());
    const { data } = await userService.login({ user });
    dispatch(loginSuccess(data.user));
  } catch ({ data }) {
    dispatch(loginError(data && data.error));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest());
    await userService.logout();
    dispatch(logoutSuccess());
  } catch ({ data }) {
    dispatch(logoutError(data && data.error));
  }
};

export const signUp = user => async dispatch => {
  try {
    dispatch(signUpRequest());
    const { data } = await userService.signUp({ user });
    dispatch(signUpSuccess(data.user));
  } catch ({ data }) {
    dispatch(signUpError(data && data.error));
  }
};
