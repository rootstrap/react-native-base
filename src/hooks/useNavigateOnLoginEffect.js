import { MAIN_SCREEN } from 'constants/screens';
import { isEmpty } from 'lodash';
import useSessionChangeEffect from './useSessionChangeEffect';

export default navigation =>
  useSessionChangeEffect(
    user => {
      const userLoggedIn = !isEmpty(user);
      if (userLoggedIn) {
        navigation.navigate(MAIN_SCREEN);
      }
    },
    [navigation]
  );
