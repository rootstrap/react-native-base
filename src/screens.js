import { Navigation } from 'react-native-navigation';

import LoginScreen from 'containers/LoginScreen';
import SignUpScreen from 'containers/SignUpScreen';
import MainScreen from 'containers/MainScreen';

const registerScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux('reactnativebase.LoginScreen', () => LoginScreen, Provider, store);
  Navigation.registerComponentWithRedux('reactnativebase.MainScreen', () => MainScreen, Provider, store);
  Navigation.registerComponentWithRedux('reactnativebase.SignUpScreen', () => SignUpScreen, Provider, store);
};

export default registerScreens;
