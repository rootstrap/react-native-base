import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export const useStockFeedState = () =>
    useSelector((state: RootState) => ({
        data: (state as any).stockFeed.data || {},
    }));

export const useStockConfigState = () =>
    useSelector((state: RootState) => ({
        configLabels: (state as any).stockFeed.config || {},
    }));

export default { useStockFeedState, useStockConfigState };
