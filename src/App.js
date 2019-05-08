import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { sessionService } from 'redux-react-native-session';

import configureStore from './store/configureStore';
import registerScreens from './screens';
import { LOGIN_SCREEN, MAIN_SCREEN } from './constants/screens';

const store = configureStore(Immutable.Map());
registerScreens(Provider, store);

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
    const shouldUpdate = this.isAuthenticated !== isAuthenticated && (!isAuthenticated || !user.isEmpty());

    if (!this.isRunning) {
      const checked = session.get('userChecked');

      if (checked) {
        this.isRunning = true;
        this.isAuthenticated = isAuthenticated;
        this.start();
      }
    } else if (shouldUpdate) {
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
