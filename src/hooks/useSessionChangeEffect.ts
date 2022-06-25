import { useEffect } from 'react';
import useSession from './useSession';

const useSessionChangeEffect = (effect: any) => {
    const { user, info } = useSession();
    useEffect(() => effect({ user, info }), [effect, user, info]);
};

export default useSessionChangeEffect;
