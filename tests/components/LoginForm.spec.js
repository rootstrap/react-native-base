import React from 'react';
import LoginForm from 'components/LoginForm';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithRedux, configureStore, BUTTON_DISABLED_EXCEPTION } from '../helpers';

describe('<LoginForm />', () => {
  let wrapper;
  let store;
  const props = {
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    store = configureStore();
    wrapper = renderWithRedux(<LoginForm {...props} />, store);
  });

  describe('Email Input', () => {
    let input;
    beforeEach(() => {
      input = wrapper.queryByTestId('email-input');
    });

    it('should display an email field', () => {
      expect(input).toBeTruthy();
    });

    describe('when the email input is valid', () => {
      beforeEach(() => {
        fireEvent.changeText(input, 'example@rootstrap.com');
        fireEvent(input, 'blur');
      });

      it('should show a email is not valid error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(0);
        expect(wrapper.queryByText('Email is not a valid email')).toBeNull();
        expect(wrapper.queryByText("Email can't be blank")).toBeNull();
      });
    });

    describe('when the email input is not present', () => {
      beforeEach(() => {
        fireEvent(input, 'blur');
      });

      it('should show a required error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
        expect(wrapper.queryByText("Email can't be blank")).toBeTruthy();
      });
    });

    describe('when the email input is not valid', () => {
      beforeEach(() => {
        fireEvent.changeText(input, 'example');
        fireEvent(input, 'blur');
      });

      it('should show a email is not valid error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
        expect(wrapper.queryByText('Email is not a valid email')).toBeTruthy();
      });
    });
  });

  describe('Password Input', () => {
    let input;
    beforeEach(() => {
      input = wrapper.queryByTestId('password-input');
    });

    it('should display a password field', () => {
      expect(input).toBeTruthy();
    });

    describe('when the password input is present', () => {
      beforeEach(() => {
        fireEvent.changeText(input, 'password');
        fireEvent(input, 'blur');
      });

      it('should not show a required error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(0);
        expect(wrapper.queryByText("Password can't be blank")).toBeNull();
      });
    });

    describe('when the password input is not present', () => {
      beforeEach(() => {
        fireEvent(input, 'blur');
      });

      it('should show a required error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
        expect(wrapper.queryByText("Password can't be blank")).toBeTruthy();
      });
    });
  });

  it('should display a submit button', () => {
    expect(wrapper.queryByTestId('login-submit-button')).toBeTruthy();
  });

  describe('when the submit button is pressed', () => {
    let submitButton;

    beforeEach(() => {
      submitButton = wrapper.queryByTestId('login-submit-button');
    });

    describe('and the form is empty', () => {
      it('should not submit the form', async () => {
        expect(() => fireEvent.press(submitButton)).toThrow(BUTTON_DISABLED_EXCEPTION);
      });
    });

    describe('and the form is valid', () => {
      beforeEach(() => {
        fireEvent.changeText(wrapper.queryByTestId('email-input'), 'example@rootstrap.com');
        fireEvent.changeText(wrapper.queryByTestId('password-input'), 'password');
        fireEvent.press(submitButton);
      });

      it('should submit the form', async () => {
        await waitFor(() => expect(props.onSubmit).toHaveBeenCalled());
      });
    });
  });
});
