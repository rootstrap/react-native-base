import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from '../components/Login/LoginForm';
import * as userActions from '../actions/userActions';
import { login } from '../actions/userActions';

const loginScreen = require('../../img/loginscreen.jpg');
const logo = require('../../img/treatmd-fullcolor.png');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const LoginScreen = ({login}) => (
  <Image source={loginScreen} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage}/>
      <LoginForm onSubmit={(user) => login(user.toJS())}/>
    </View>
  </Image>
);

const { func } = PropTypes;

LoginScreen.propTypes = {
  login: func.isRequired
};

LoginScreen.navigationOptions = {
  title: 'Log In'
};

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user))
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch'
  },
  logoImage: {
    width: 150,
    height: 30,
    resizeMode: 'stretch',
    marginBottom: 20
  }
});

export default connect(null, mapDispatch)(LoginScreen);
