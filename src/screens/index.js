import { Navigation } from 'react-native-navigation';

import LoginScreen from 'containers/LoginScreen';
import MainScreen from 'containers/MainScreen';
import SignUpScreen from 'containers/SignUpScreen';

import {
  LOGIN_SCREEN, MAIN_SCREEN, SIGN_UP_SCREEN,
} from 'constants/screens';

export default (Provider, store) => {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store);
  Navigation.registerComponentWithRedux(MAIN_SCREEN, () => MainScreen, Provider, store);
  Navigation.registerComponentWithRedux(SIGN_UP_SCREEN, () => SignUpScreen, Provider, store);
};
