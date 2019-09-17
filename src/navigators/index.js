import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import LoginScreen from 'screens/LoginScreen';
import MainScreen from 'screens/MainScreen';
import SignUpScreen from 'screens/SignUpScreen';
import AppLoader from 'screens/AppLoader';

const AuthStack = createStackNavigator({
  LoginScreen,
  SignUpScreen,
});

const AppStack = createStackNavigator({
  MainScreen,
});

const AppNavigator = createAnimatedSwitchNavigator(
  {
    AppLoader,
    AuthStack,
    AppStack,
  },
  {
    initialRouteName: 'AppLoader',
  },
);

export default createAppContainer(AppNavigator);
