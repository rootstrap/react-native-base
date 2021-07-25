import { useEffect } from 'react';
import useStockFeedState from '../hooks/useStockFeedState';

const useStockFeedStateChangeEffect = (effect: any) => {
  const { stockData } = useStockFeedState();
  useEffect(() => effect({ stockData }), [effect, stockData]);
};

export default useStockFeedStateChangeEffect;
