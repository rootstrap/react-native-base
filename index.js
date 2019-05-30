import { Navigation } from 'react-native-navigation';
import App from './src/App';

Navigation.events().registerAppLaunchedListener(() => {
  const app = new App();
});
