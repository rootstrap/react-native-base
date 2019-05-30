import { Navigation } from 'react-native-navigation';
import Immutable from 'immutable';
import { sessionService } from 'redux-react-native-session';

import configureStore from './store/configureStore';
import registerScreens from './screens';
import { LOGIN_SCREEN, MAIN_SCREEN } from './constants/screens';

const store = configureStore(Immutable.Map());
registerScreens(store);

class App {
  constructor() {
    this.isRunning = false;
    this.isAuthenticated = false;

    sessionService.initSessionService(store);

    store.subscribe(this.onStoreUpdate.bind(this));
  }

  onStoreUpdate() {
    const session = store.getState().get('session');
    const isAuthenticated = session.get('authenticated');
    const user = session.get('user');

    const userLoggedOut = this.isAuthenticated !== isAuthenticated && !isAuthenticated;
    const userLoggedIn = this.isAuthenticated !== isAuthenticated && !user.isEmpty();

    if (!this.isRunning) {
      const wasAsyncStorageChecked = session.get('userChecked');

      if (wasAsyncStorageChecked) {
        this.isRunning = true;
        this.isAuthenticated = isAuthenticated;
        this.start();
      }
    } else if (userLoggedOut || userLoggedIn) {
      this.isAuthenticated = isAuthenticated;
      this.start();
    }
  }

  start() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: this.isAuthenticated ? MAIN_SCREEN : LOGIN_SCREEN,
              }
            }
          ]
        }
      },
    });
  }
}

export default App;
