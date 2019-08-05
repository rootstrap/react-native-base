import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-native-session';
import Config from 'react-native-config';
import nock from 'nock';

import LoginScreen from 'containers/LoginScreen';
import configureStore from 'store/configureStore';

import '../test-helper';

describe('<LoginScreen />', () => {
  const userEmail = 'example@example.com';
  const userPassword = 'example';
  let wrapper;
  let emailInput;
  let passwordInput;
  let submitButton;
  let response;
  let data;

  beforeEach(() => {
    const store = configureStore();
    wrapper = mount(
      <Provider store={store}>
        <LoginScreen
          navigation={{
            navigate: () => null,
          }}
        />
      </Provider>
    );

    data = {
      user: {
        email: userEmail,
        password: userPassword,
      },
    };

    response = {
      user: {
        username: null,
        password: null,
        id: 1,
        email: userEmail,
      },
    };

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    emailInput = wrapper.find('TextInput').at(0);
    passwordInput = wrapper.find('TextInput').at(2);
    submitButton = wrapper.find('Button').at(0);
  });

  it('should display an email input field', () => {
    expect(emailInput.props().name).toEqual('email');
  });

  it('should display a password input field', () => {
    expect(passwordInput.props().name).toEqual('password');
  });

  describe('submit Login with valid email/password inputs', () => {
    beforeEach(() => {
      nock(Config.API_URL)
        .post('/users/sign_in', data)
        .reply(200, response);

      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText(userPassword);
      submitButton.props().onPress();
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('should call redux-react-native-session to save the user data', done => {
      // wait for the call to save user
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalledWith(response.user);
        done();
        return Promise.resolve();
      });
    });
  });

  describe('submit with invalid email', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText('no valid email');
      passwordInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const loginForm = wrapper.find('LoginForm');
      expect(loginForm.props().valid).toEqual(false);
    });
  });

  describe('submit with blank email', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText('');
      passwordInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const loginForm = wrapper.find('LoginForm');
      expect(loginForm.props().valid).toEqual(false);
    });
  });

  describe('submit with blank password', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText('');
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const loginForm = wrapper.find('LoginForm');
      expect(loginForm.props().valid).toEqual(false);
    });
  });

  describe('submit with errors from server', () => {
    beforeEach(async () => {
      response = {
        error: 'Invalid login credentials. Please try again.',
      };

      nock(Config.API_URL)
        .post('/users/sign_in', data)
        .reply(401, response);

      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should display the server error in the form', () => {
      const loginForm = wrapper.find('LoginForm');
      const error = 'Invalid login credentials. Please try again.';
      expect(loginForm.props().error).toEqual(error);
    });
  });
});
