import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const useStockFeedState = () =>
  useSelector((state: RootState) => ({
    stockData: (state as any).stockFeed.data || {},
  }));

export default useStockFeedState;
