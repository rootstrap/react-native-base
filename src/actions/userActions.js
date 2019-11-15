import { createThunk, createAction } from '@rootstrap/redux-tools';
import userService from 'services/userService';

export const login = createThunk('LOGIN', async user => {
  try {
    const {
      data: { user: createdUser },
    } = await userService.login({ user });
    return createdUser;
  } catch (err) {
    throw err.data.error;
  }
});

export const logout = createThunk('LOGOUT', async () => {
  try {
    await userService.logout();
  } catch (err) {
    throw err.data.error;
  }
});

export const signUp = createThunk('SIGNUP', async user => {
  try {
    const {
      data: { user: createdUser },
    } = await userService.signUp({ user });
    return createdUser;
  } catch (err) {
    throw err.data.error;
  }
});

export const updateSession = createAction('UPDATE_SESSION');

export const { success: loginSuccess } = login;
export const { success: signUpSuccess } = signUp;
export const { success: logoutSuccess } = logout;
