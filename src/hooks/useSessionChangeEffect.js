import { useEffect } from 'react';
import useSession from 'hooks/useSession';

const useSessionChangeEffect = effect => {
  const session = useSession();
  useEffect(() => effect(session), [effect, session]);
};

export default useSessionChangeEffect;
