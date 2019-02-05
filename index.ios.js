
import { Navigation } from 'react-native-navigation';
import App from 'components/App';

Navigation.events().registerAppLaunchedListener(() => {
  const app = new App();
});
