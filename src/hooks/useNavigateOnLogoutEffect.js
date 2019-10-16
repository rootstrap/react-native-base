import { LOGIN_SCREEN } from 'constants/screens';
import useSessionChangeEffect from './useSessionChangeEffect';

export default navigation =>
  useSessionChangeEffect(({ info }) => {
    if (!info) {
      navigation.navigate(LOGIN_SCREEN);
    }
  });
