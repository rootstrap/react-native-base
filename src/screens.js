import { Navigation } from 'react-native-navigation';

import LoginScreen from 'containers/LoginScreen';
import MainScreen from 'containers/MainScreen';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('reactnativebase.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('reactnativebase.MainScreen', () => MainScreen, store, Provider);
};

export default registerScreens;
