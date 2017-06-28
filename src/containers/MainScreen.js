import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions';

const MainScreen = ({ navigation, actions: { logout } }) => (
  <View style={styles.container}>
    <Text>You're logged in!</Text>
    <Button
      onPress={logout}
      title="Logout"
    />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

const mapDispatch = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default connect(null, mapDispatch)(MainScreen);
