import type { CustomTheme } from 'themes/types';

declare module '@react-navigation/native' {
  export function useTheme(): CustomTheme;
}
