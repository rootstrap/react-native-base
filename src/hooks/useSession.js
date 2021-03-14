import { useSelector } from 'react-redux';

const useSession = () =>
  useSelector(({ session: { user, info } }) => ({
    user: user || { email: 'brianvarley9@gmail.com' },
    info: info || { name: 'bvar' },
  }));

export default useSession;
