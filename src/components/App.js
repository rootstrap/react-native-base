import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { sessionService } from 'redux-react-native-session';

import configureStore from 'store/configureStore';
import { Screens, registerScreens } from '../screens';

const store = configureStore(Immutable.Map());
registerScreens(store, Provider);

class App {
  constructor() {
    this.authenticated = false;
    sessionService.initSessionService(store);
  }

  start() {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions({});
      this.startUnAuthenticatedApp();
      store.subscribe(this.onStoreUpdate.bind(this));
    });
  }

  onStoreUpdate() {
    const session = store.getState().get('session');
    const authenticated = session.get('authenticated');
    const user = session.get('user');
    const shouldUpdate = this.authenticated !== authenticated && (!authenticated || !user.isEmpty());
    if (shouldUpdate) {
      this.authenticated = authenticated;
      this.updateApp(authenticated);
    }
  }

  startAuthenticatedApp() {
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

  startUnAuthenticatedApp() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: Screens.LoginScreen
            }
          }]
        }
      }
    });
  }

  updateApp(authenticated) {
    authenticated ?
      this.startAuthenticatedApp() :
      this.startUnAuthenticatedApp();
  }
}

export default new App();
