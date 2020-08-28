import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { LOGIN_SCREEN, MAIN_SCREEN } from 'constants/screens';
import Navigator from 'navigators';

import {
  renderWithRedux,
  mockedHttpClient,
  configureStore,
  configureAuthenticatedStore,
  AUTHENTICATED_RESPONSE_HEADERS,
} from '../helpers';

describe('Navigator', () => {
  describe('when the user is logged out', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = configureStore();
      wrapper = renderWithRedux(<Navigator />, store);
    });

    it('should render the login in screen', () => {
      expect(wrapper.queryByTestId(LOGIN_SCREEN)).toBeTruthy();
    });

    describe('when the user logs in correctly', () => {
      beforeEach(() => {
        fireEvent.changeText(wrapper.queryByTestId('email-input'), 'example@rootstrap.com');
        fireEvent.changeText(wrapper.queryByTestId('password-input'), 'password');
      });

      it('should render the main screen', async () => {
        mockedHttpClient(store)
          .onPost('/users/sign_in')
          .reply(
            200,
            {
              user: {
                id: 482,
                email: 'example@rootstrap.com',
                uid: 'example@rootstrap.com',
              },
            },
            AUTHENTICATED_RESPONSE_HEADERS,
          );
        fireEvent.press(wrapper.queryByTestId('login-submit-button'));

        await waitFor(() => {
          expect(wrapper.queryByTestId(LOGIN_SCREEN)).toBeNull();
          expect(wrapper.queryByTestId(MAIN_SCREEN)).toBeTruthy();
        });
      });

      describe('when the user fails to logs in', () => {
        beforeEach(() => {
          fireEvent.changeText(wrapper.queryByTestId('email-input'), 'example@rootstrap.com');
          fireEvent.changeText(wrapper.queryByTestId('password-input'), 'password');
        });

        it('should stay on the login screen', async () => {
          mockedHttpClient(store)
            .onPost('/users/sign_in')
            .reply(401, {
              error: 'Invalid login credentials. Please try again.',
            });
          fireEvent.press(wrapper.queryByTestId('login-submit-button'));

          await waitFor(() => {
            expect(wrapper.queryByTestId(LOGIN_SCREEN)).toBeTruthy();
            expect(wrapper.queryByTestId(MAIN_SCREEN)).toBeNull();
          });
        });
      });
    });
  });

  describe('when the user is logged in', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = configureAuthenticatedStore();
      wrapper = renderWithRedux(<Navigator />, store);
    });

    it('should render the main screen', () => {
      expect(wrapper.queryByTestId(MAIN_SCREEN)).toBeTruthy();
    });

    describe('when the user press the logout button', () => {
      it('should redirect the user to the login screen', async () => {
        mockedHttpClient(store)
          .onDelete('/users/sign_out')
          .reply(200, { success: true }, {});

        fireEvent.press(wrapper.queryByTestId('logout-button'));

        await waitFor(() => {
          expect(wrapper.queryByTestId(LOGIN_SCREEN)).toBeTruthy();
          expect(wrapper.queryByTestId(MAIN_SCREEN)).toBeNull();
        });
      });
    });
  });
});
