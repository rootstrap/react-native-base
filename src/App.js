import { Navigation } from 'react-native-navigation';
import { sessionService } from 'redux-react-native-session';

import configureStore from './store/configureStore';
import registerScreens from './screens';
import { LOGIN_SCREEN, MAIN_SCREEN } from './constants/screens';

const store = configureStore({});
registerScreens(store);

class App {
  constructor() {
    this.isRunning = false;
    this.isAuthenticated = false;

    sessionService.initSessionService(store);

    store.subscribe(this.onStoreUpdate.bind(this));
  }

  onStoreUpdate() {
    const { session } = store.getState();
    const isAuthenticated = session.authenticated;
    const { user } = session;

    const authenticationChanged = this.isAuthenticated !== isAuthenticated;
    const userLoggedOut = authenticationChanged && !isAuthenticated;
    const userLoggedIn = authenticationChanged && !user.isEmpty();

    if (!this.isRunning) {
      const { userChecked: wasAsyncStorageChecked } = session;

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
