import React from 'react';
import { string, func } from 'prop-types';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { getUser } from 'selectors/sessionSelector';
import { logout } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const MainScreen = ({ email, logout }) => (
  <View style={styles.container}>
    <Text>Hey {email}, you&#39;re logged in!</Text>
    <Button
      onPress={logout}
      title={translate('MAIN_SCREEN.logout')}
    />
  </View>
);

MainScreen.propTypes = {
  email: string.isRequired,
  logout: func.isRequired
};

MainScreen.navigationOptions = {
  title: translate('MAIN_SCREEN.title'),
};

const mapState = state => ({
  email: getUser(state).email
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(MainScreen);
