import LoginScreen from 'containers/LoginScreen';
import MainScreen from 'containers/MainScreen';
import SignUpScreen from 'containers/SignUpScreen';
import { LOGIN_SCREEN, MAIN_SCREEN, SIGN_UP_SCREEN } from 'constants/screens';

import registerScreen from './registerScreen';

export default store => {
  registerScreen(LOGIN_SCREEN, LoginScreen, store);
  registerScreen(MAIN_SCREEN, MainScreen, store);
  registerScreen(SIGN_UP_SCREEN, SignUpScreen, store);
};
