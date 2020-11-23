import { fireEvent, waitFor } from '@testing-library/react-native';

import { LOGIN_SCREEN } from 'constants/screens';
import LoginScreen from 'screens/LoginScreen';

import {
  renderWithNavigation,
  mockedHttpClient,
  configureStore,
  AUTHENTICATED_RESPONSE_HEADERS,
} from '../helpers';

describe('<LoginScreen />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureStore();
    wrapper = renderWithNavigation(LoginScreen, store);
  });

  it('should render the login screen', () => {
    expect(wrapper.queryByTestId(LOGIN_SCREEN)).toBeTruthy();
  });

  it('should display an email field', () => {
    expect(wrapper.queryByTestId('email-input')).toBeTruthy();
  });

  it('should display a password field', () => {
    expect(wrapper.queryByTestId('password-input')).toBeTruthy();
  });

  describe('when the user submits the form', () => {
    beforeEach(() => {
      fireEvent.changeText(wrapper.queryByTestId('email-input'), 'example@rootstrap.com');
      fireEvent.changeText(wrapper.queryByTestId('password-input'), 'password');
    });

    it('should show the loading spinner', async () => {
      mockedHttpClient(store)
        .onPost('/users/sign_in')
        .reply(200);
      fireEvent.press(wrapper.queryByTestId('login-submit-button'));

      expect(wrapper.queryByText('Loading')).toBeTruthy();
      await waitFor(() => expect(wrapper.queryByText('Loading')).toBeNull());
    });

    describe('if the user exist', () => {
      it('should show no errors', async () => {
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

        expect(wrapper.queryAllByLabelText('form-error')).toEqual([]);
        await waitFor(() => expect(wrapper.queryByText('Loading')).toBeNull());
      });
    });

    describe('if the user does not exist or has invalid credentials', () => {
      it('should show no errors', async () => {
        mockedHttpClient(store)
          .onPost('/users/sign_in')
          .reply(401, {
            error: 'Invalid login credentials. Please try again.',
          });
        fireEvent.press(wrapper.queryByTestId('login-submit-button'));

        await waitFor(() => {
          expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
          expect(wrapper.queryByText('Invalid login credentials. Please try again.')).toBeTruthy();
        });
      });
    });

    describe('if there is a network error', () => {
      it('should show no errors', async () => {
        mockedHttpClient(store)
          .onPost('/users/sign_in')
          .networkError();
        fireEvent.press(wrapper.queryByTestId('login-submit-button'));

        await waitFor(() => {
          expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
          expect(wrapper.queryByText('Something Went Wrong')).toBeTruthy();
        });
      });
    });
  });
});
