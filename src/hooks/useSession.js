import { useSelector } from 'react-redux';

const useSession = () =>
  useSelector(({ session }) => ({
    authenticated: session.authenticated,
    userChecked: session.userChecked,
    user: session.user,
  }));

export default useSession;
