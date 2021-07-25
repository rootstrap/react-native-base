import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const useStockFeedState = () =>
  useSelector((state: RootState) => ({
    data: (state as any).stockFeed.data || {},
  }));

export default useStockFeedState;
