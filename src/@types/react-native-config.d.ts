import { NativeConfigType } from './env';

declare module 'react-native-config' {
  export interface NativeConfig extends NativeConfigType {}

  export const Config: NativeConfig;
  export default Config;
}
