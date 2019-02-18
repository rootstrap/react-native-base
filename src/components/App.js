import { Navigation } from 'react-native-navigation';

import { Screens, registerScreens } from '../screens';

registerScreens();

class App {
  start() {
    Navigation.events().registerAppLaunchedListener(() => {
      this.startApp();
    });
  }

  startApp() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: Screens.MainScreen
            }
          }]
        }
      }
    });
  }
}

export default new App();
