import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
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

const AppNavigator = createSwitchNavigator(
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
