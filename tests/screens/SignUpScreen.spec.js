import { fireEvent, waitFor } from '@testing-library/react-native';

import { SIGN_UP_SCREEN } from 'constants/screens';
import SignUpScreen from 'screens/SignUpScreen';

import {
  renderWithNavigation,
  mockedHttpClient,
  configureStore,
  AUTHENTICATED_RESPONSE_HEADERS,
} from '../helpers';

describe('<SignUpScreen />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureStore();
    wrapper = renderWithNavigation(SignUpScreen, store);
  });

  it('should render the sign up screen', () => {
    expect(wrapper.queryByTestId(SIGN_UP_SCREEN)).toBeTruthy();
  });

  it('should display an email field', () => {
    expect(wrapper.queryByTestId('email-input')).toBeTruthy();
  });

  it('should display a password field', () => {
    expect(wrapper.queryByTestId('password-input')).toBeTruthy();
  });

  it('should display a password confirmation field', () => {
    expect(wrapper.queryByTestId('confirm-password-input')).toBeTruthy();
  });

  describe('when the user submits the form', () => {
    beforeEach(() => {
      fireEvent.changeText(wrapper.queryByTestId('email-input'), 'example@rootstrap.com');
      fireEvent.changeText(wrapper.queryByTestId('password-input'), 'password');
      fireEvent.changeText(wrapper.queryByTestId('confirm-password-input'), 'password');
    });

    it('should show the loading spinner', async () => {
      mockedHttpClient(store)
        .onPost('/users')
        .reply(200);
      fireEvent.press(wrapper.queryByTestId('signup-submit-button'));

      expect(wrapper.queryByText('Loading')).toBeTruthy();
      await waitFor(() => expect(wrapper.queryByText('Loading')).toBeNull());
    });

    describe('if the user exist', () => {
      it('should show existing user errors', async () => {
        mockedHttpClient(store)
          .onPost('/users')
          .reply(422, {
            errors: {
              email: ['has already been taken'],
            },
          });
        fireEvent.press(wrapper.queryByTestId('signup-submit-button'));

        await waitFor(() => {
          expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
          expect(wrapper.queryByText('email has already been taken')).toBeTruthy();
        });
      });
    });

    describe('if the user does not exist', () => {
      it('should show no errors', async () => {
        mockedHttpClient(store)
          .onPost('/users')
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
        fireEvent.press(wrapper.queryByTestId('signup-submit-button'));

        await waitFor(() => expect(wrapper.queryAllByLabelText('form-error')).toEqual([]));
      });
    });

    describe('if there is a network error', () => {
      it('should an error', async () => {
        mockedHttpClient(store)
          .onPost('/users')
          .networkError();
        fireEvent.press(wrapper.queryByTestId('signup-submit-button'));

        await waitFor(() => {
          expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
          expect(wrapper.queryByText('Something Went Wrong')).toBeTruthy();
        });
      });
    });
  });
});
