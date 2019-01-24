import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-native-session';
import Config from 'react-native-config';
import nock from 'nock';

import SignUpScreen from 'containers/SignUpScreen';
import configureStore from 'store/configureStore';

describe('<SignUpScreen />', () => {
  const userEmail = 'example@example.com';
  const userPassword = 'example';
  let wrapper;
  let emailInput;
  let passwordInput;
  let passwordConfirmationInput;
  let submitButton;
  let response;
  let data;

  beforeEach(() => {
    const store = configureStore();
    wrapper = mount(
      <Provider store={store}>
        <SignUpScreen />
      </Provider>
    );

    data = {
      user: {
        email: userEmail,
        password: userPassword,
        password_confirmation: userPassword,
      }
    };

    response = {
      user: {
        username: null,
        password: null,
        id: 1,
        email: userEmail,
      }
    };

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    emailInput = wrapper.find('TextInput').at(0);
    passwordInput = wrapper.find('TextInput').at(2);
    passwordConfirmationInput = wrapper.find('TextInput').at(4);
    submitButton = wrapper.find('Button').at(0);
  });

  it('should display an email input field', () => {
    expect(emailInput.props().name).toEqual('email');
  });

  it('should display a password input field', () => {
    expect(passwordInput.props().name).toEqual('password');
  });

  it('should display a password confirmation input field', () => {
    expect(passwordConfirmationInput.props().name).toEqual('passwordConfirmation');
  });

  describe('submit SignUp with valid email/password inputs', () => {
    beforeEach(() => {
      nock(Config.API_URL)
        .post('/users', data)
        .reply(200, response);

      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText(userPassword);
      passwordConfirmationInput.props().onChangeText(userPassword);
      submitButton.props().onPress();
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('should call redux-react-native-session to save the user data', (done) => {
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
      passwordConfirmationInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const signUpForm = wrapper.find('SignUpForm');
      expect(signUpForm.props().valid).toEqual(false);
    });
  });

  describe('submit with blank email', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText('');
      passwordInput.props().onChangeText(userPassword);
      passwordConfirmationInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const signUpForm = wrapper.find('SignUpForm');
      expect(signUpForm.props().valid).toEqual(false);
    });
  });

  describe('submit with blank password', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText('');
      passwordConfirmationInput.props().onChangeText('');
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const signUpForm = wrapper.find('SignUpForm');
      expect(signUpForm.props().valid).toEqual(false);
    });
  });

  describe('submit with non matching passwords', () => {
    beforeEach(async () => {
      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText('password1');
      passwordConfirmationInput.props().onChangeText('password2');
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should be an invalid form', () => {
      const signUpForm = wrapper.find('SignUpForm');
      expect(signUpForm.props().valid).toEqual(false);
    });
  });

  describe('submit with errors from server', () => {
    beforeEach(async () => {
      response = {
        error: 'Invalid signUp credentials. Please try again.'
      };

      nock(Config.API_URL)
        .post('/users', data)
        .reply(401, response);

      emailInput.props().onChangeText(userEmail);
      passwordInput.props().onChangeText(userPassword);
      passwordConfirmationInput.props().onChangeText(userPassword);
      await submitButton.props().onPress();
      wrapper.update();
    });

    it('should display the server error in the form', () => {
      const signUpForm = wrapper.find('SignUpForm');
      const error = 'Invalid signUp credentials. Please try again.';
      expect(signUpForm.props().error).toEqual(error);
    });
  });
});
