import { createThunk, createAction } from '@rootstrap/redux-tools';
import userService from 'services/userService';
import parseError from 'utils/parseError';

export const login = createThunk('LOGIN', async user => {
  try {
    const {
      data: { user: createdUser },
    } = await userService.login({ user });
    return createdUser;
  } catch ({ data }) {
    throw parseError(data);
  }
});

export const logout = createThunk('LOGOUT', async () => {
  try {
    await userService.logout();
  } catch ({ data }) {
    throw parseError(data);
  }
});

export const signUp = createThunk('SIGNUP', async user => {
  try {
    const {
      data: { user: createdUser },
    } = await userService.signUp({ user });
    return createdUser;
  } catch ({ data }) {
    throw parseError(data);
  }
});

export const updateSession = createAction('UPDATE_SESSION');

export const { success: loginSuccess } = login;
export const { success: signUpSuccess } = signUp;
export const { success: logoutSuccess } = logout;
