import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from 'containers/LoginScreen';
import MainScreen from 'containers/MainScreen';
import SignUpScreen from 'containers/SignUpScreen';
import AppLoader from 'containers/AppLoader';

const AuthStack = createStackNavigator({
  LoginScreen,
  SignUpScreen
});

const AppStack = createStackNavigator({
  MainScreen
});

const AppNavigator = createSwitchNavigator(
  {
    AppLoader,
    AuthStack,
    AppStack
  },
  {
    initialRouteName: 'AppLoader'
  }
);

export default createAppContainer(AppNavigator);
