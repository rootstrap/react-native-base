import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { sessionService } from 'redux-react-native-session';

import AppReducer from '../reducers';
import AppWithNavigationState from '../navigation/AppNavigator';
import configureStore from '../store/configureStore';

class App extends Component {
  store = configureStore(Immutable.Map());

  componentWillMount() {
    sessionService.initSessionService(this.store);
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
} 

export default App;
