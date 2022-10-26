import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type { NativeStackScreenProps };

export enum AppScreens {
  // Auth
  Welcome = 'Welcome',
  // Main
  Home = 'Home',
}

export enum Stacks {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
}

// TODO: Example -> [AppScreens.Welcome]: { exampleParam: string };
export type StackParamList = {
  // Auth
  [AppScreens.Welcome]: undefined;
  // Main
  [AppScreens.Home]: undefined;
};
