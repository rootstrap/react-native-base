import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { logout } from 'actions/userActions';
import styles from './styles';

const MainScreen = ({ logout }) => (
  <View style={styles.container}>
    <Text>You&#39;re logged in!</Text>
    <Button
      onPress={logout}
      title="Logout"
    />
  </View>
);

const { func } = PropTypes;

MainScreen.propTypes = {
  logout: func.isRequired
};

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatch)(MainScreen);
