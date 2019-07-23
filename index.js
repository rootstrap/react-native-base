import { Navigation } from 'react-native-navigation';
import App from './src/App';

Navigation.events().registerAppLaunchedListener(() => {
  // eslint-disable-next-line no-unused-vars
  const app = new App();
});
