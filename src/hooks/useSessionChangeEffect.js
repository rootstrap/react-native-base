import { useEffect } from 'react';
import useSession from 'hooks/useSession';

const useSessionChangeEffect = (effect, ...deps) => {
  const { user } = useSession();

  useEffect(() => effect(user), [user, ...deps]);
};

export default useSessionChangeEffect;
