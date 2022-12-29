export type { NativeStackScreenProps } from '@react-navigation/native-stack';

const RootStackScreens = {
  InAppSplash: 'InAppSplash',
  RootStack: 'RootStack',
} as const;

const AuthStackScreens = {
  Welcome: 'Welcome',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
} as const;

const MainStackScreens = {
  Home: 'Home',
} as const;

export enum Stacks {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
  RootStack = 'RootStack',
}

// NOTE: in case you want to include params you can append
/*

Record<...> & {
  [*-StackScreens.*]: {
    params
  };
};

*/

export type AuthStackParamList = Record<
  typeof AuthStackScreens[keyof typeof AuthStackScreens],
  undefined
>;

export type MainStackParamList = Record<
  typeof MainStackScreens[keyof typeof MainStackScreens],
  undefined
>;

export type RootStackParamList = Record<
  typeof RootStackScreens[keyof typeof RootStackScreens],
  undefined
>;
