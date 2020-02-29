import { MAIN_SCREEN } from 'constants/screens';
import MainScreen from 'screens/MainScreen';

import { renderWithNavigation, configureStore } from '../helpers';

describe('<MainScreen />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureStore({
      session: {
        user: {
          email: 'example@rootstrap.com',
        },
      },
    });
    wrapper = renderWithNavigation(MainScreen, store);
  });

  it('should render the login screen', () => {
    expect(wrapper.queryByTestId(MAIN_SCREEN)).toBeTruthy();
  });

  it('should render the logout', () => {
    expect(wrapper.queryByTestId('logout-button')).toBeTruthy();
  });

  it('should render the welcome message in screen', () => {
    expect(wrapper.queryByText("Hey example@rootstrap.com, you're logged in!")).toBeTruthy();
  });
});
