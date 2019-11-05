/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import SignUpScreen from 'screens/SignUpScreen';
import configureStore from 'store/configureStore';

import '../test-helper';

describe('<SignUpScreen />', () => {
  let wrapper;
  let emailInput;
  let passwordInput;
  let passwordConfirmationInput;

  beforeEach(() => {
    const store = configureStore();
    wrapper = mount(
      <Provider store={store}>
        <SignUpScreen
          navigation={{
            navigate: () => null,
          }}
        />
      </Provider>,
    );
    emailInput = wrapper.find('Input').at(0);
    passwordInput = wrapper.find('Input').at(1);
    passwordConfirmationInput = wrapper.find('Input').at(2);
  });

  it('should display an email input field', () => {
    expect(emailInput.props().label).toEqual('Email');
  });

  it('should display a password input field', () => {
    expect(passwordInput.props().label).toEqual('Password');
  });

  it('should display a password confirmation input field', () => {
    expect(passwordConfirmationInput.props().label).toEqual('Password confirmation');
  });
});
