import App from 'components/App';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(() => {
  const app = new App();
});
