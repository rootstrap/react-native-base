import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const useSession = () =>
  useSelector((state: RootState) => ({
    user: (state as any).session.user || {},
    info: (state as any).session.info,
  }));

export default useSession;
