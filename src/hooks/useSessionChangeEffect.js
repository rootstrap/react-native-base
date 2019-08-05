import { useEffect } from 'react';
import useSession from 'hooks/useSession';

const useSessionChangeEffect = (effect, ...deps) => {
  const { user, authenticated, userChecked } = useSession();

  useEffect(() => effect({ user, authenticated, userChecked }), [
    user,
    authenticated,
    userChecked,
    ...deps,
  ]);
};

export default useSessionChangeEffect;
