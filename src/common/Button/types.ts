import { ComponentProps } from 'react';
import { Pressable } from 'react-native';

export type ButtonProps = {
  title: string;
} & ComponentProps<typeof Pressable>;
