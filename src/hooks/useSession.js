import { useSelector } from 'react-redux';

const useSession = () =>
  useSelector(({ session: { user, info } }) => ({
    user: user || {},
    info,
  }));

export default useSession;
