import { MAIN_SCREEN } from 'constants/screens';
import useSessionChangeEffect from './useSessionChangeEffect';

export default navigation =>
  useSessionChangeEffect(({ info, user }) => {
    if (info && user) {
      navigation.navigate(MAIN_SCREEN);
    }
  });
