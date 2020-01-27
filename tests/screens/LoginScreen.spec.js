/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LoginScreen from 'screens/LoginScreen';
import configureStore from 'store/configureStore';

import '../test-helper';

describe('<LoginScreen />', () => {
  let wrapper;
  let emailInput;
  let passwordInput;

  beforeEach(() => {
    const { store } = configureStore();
    wrapper = mount(
      <Provider store={store}>
        <LoginScreen
          navigation={{
            navigate: () => null,
          }}
        />
      </Provider>,
    );

    emailInput = wrapper.find('Input').at(0);
    passwordInput = wrapper.find('Input').at(1);
  });

  it('should display an email input field', () => {
    expect(emailInput.props().label).toEqual('Email');
  });

  it('should display a password input field', () => {
    expect(passwordInput.props().label).toEqual('Password');
  });
});
