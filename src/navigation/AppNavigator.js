import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../containers/LoginScreen';
import MainScreen from '../containers/MainScreen';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen }
});

const AppWithNavigationState = ({ dispatch, nav, session }) => (
  session.sessionChecked &&
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const { func, object } = PropTypes;

AppWithNavigationState.propTypes = {
  dispatch: func.isRequired,
  nav: object.isRequired
};

const mapStateToProps = (state) => ({
  nav: state.get('nav').toJS(),
  session: state.get('session')
});

export default connect(mapStateToProps)(AppWithNavigationState);
