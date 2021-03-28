import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const useSession = () =>
  useSelector((state: RootState) => ({
    user: (state as any).session.user || { email: 'brianvarley9@gmail.com' },
    info: (state as any).session.info || { name: 'bvar' },
  }));

export default useSession;
