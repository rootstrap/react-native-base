import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList, AuthStackScreens } from 'navigation/stacks/auth';

export type WelcomeNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackScreens.Welcome
>;
