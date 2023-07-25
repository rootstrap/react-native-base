import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList, AuthStackScreens } from 'navigation/stacks/auth';

export type SignInNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackScreens.SignIn
>;
