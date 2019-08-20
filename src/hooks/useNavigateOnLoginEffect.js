import { MAIN_SCREEN } from 'constants/screens';
import useSessionChangeEffect from './useSessionChangeEffect';

export default navigation =>
  useSessionChangeEffect(({ authenticated }) => {
    if (authenticated) {
      navigation.navigate(MAIN_SCREEN);
    }
  });
