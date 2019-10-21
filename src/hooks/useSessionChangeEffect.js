import { useEffect } from 'react';
import useSession from 'hooks/useSession';

const useSessionChangeEffect = effect => {
  const { user, info } = useSession();
  useEffect(() => effect({ user, info }), [effect, user, info]);
};

export default useSessionChangeEffect;
