import { useEffect } from 'react';
import useStockFeedState from '../hooks/useStockFeedState';

const useStockFeedStateChangeEffect = (effect: any) => {
  const { data } = useStockFeedState();
  useEffect(() => effect({ data }), [effect, data]);
};

export default useStockFeedStateChangeEffect;
