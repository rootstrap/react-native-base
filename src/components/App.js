import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { sessionService } from 'redux-react-native-session';

import AppWithNavigationState from '../navigation/AppNavigator';
import configureStore from '../store/configureStore';

class App extends Component {
  componentWillMount() {
    sessionService.initSessionService(this.store);
  }

  store = configureStore(Immutable.Map());

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
