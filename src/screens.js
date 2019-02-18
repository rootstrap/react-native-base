import { Navigation } from 'react-native-navigation';

import LoginScreen from 'containers/LoginScreen';
import SignUpScreen from 'containers/SignUpScreen';
import MainScreen from 'containers/MainScreen';

export const Screens = {
  MainScreen: 'reactnativebase.MainScreen',
  LoginScreen: 'reactnativebase.LoginScreen',
  SignUpScreen: 'reactnativebase.SignUpScreen'
}

export const registerScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux(Screens.LoginScreen, () => LoginScreen, Provider, store);
  Navigation.registerComponentWithRedux(Screens.MainScreen, () => MainScreen, Provider, store);
  Navigation.registerComponentWithRedux(Screens.SignUpScreen, () => SignUpScreen, Provider, store);
};

