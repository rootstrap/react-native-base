import { Navigation } from 'react-native-navigation';

import LoginScreen from 'containers/LoginScreen';
import SignUpScreen from 'containers/SignUpScreen';
import MainScreen from 'containers/MainScreen';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('reactnativebase.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('reactnativebase.MainScreen', () => MainScreen, store, Provider);
  Navigation.registerComponent('reactnativebase.SignUpScreen', () => SignUpScreen, store, Provider);
};

export default registerScreens;
