import { Navigation } from 'react-native-navigation';

import MainScreen from './components/MainScreen';

export const Screens = {
  MainScreen: 'reactnativebase.MainScreen'
}

export const registerScreens = () => {
  Navigation.registerComponent(Screens.MainScreen, () => MainScreen);
};

