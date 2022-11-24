declare module 'react-native-config' {
  interface Environment {
    API_URL: string;
    BASE_URL: string;
  }
  const Config: Environment;
  export default Config;
}
