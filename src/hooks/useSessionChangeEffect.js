import { useEffect } from 'react';
import useSession from 'hooks/useSession';

const useSessionChangeEffect = effect => {
  const session = useSession();
  useEffect(() => effect(session), [session]);
};

export default useSessionChangeEffect;
