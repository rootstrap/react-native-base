import type { RouteProp as NRouteProp } from '@react-navigation/native';

import { AuthStackParamList } from './stacks/auth';
import { MainStackParamList } from './stacks/main';

export enum RootStacks {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
}

// You need to add any other stack params list created in the app here to enhance the navigation type check's
export type RootStackParamList = AuthStackParamList & MainStackParamList;

// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<RootStackParamList, T>;
