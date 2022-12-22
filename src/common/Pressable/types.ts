import { ComponentProps } from 'react';
import { Pressable, ViewProps } from 'react-native';

export type ButtonProps = {
  containerStyle: ViewProps['style'];
  disabledStyle: ViewProps['style'];
  children: JSX.Element;
} & ComponentProps<typeof Pressable>;
