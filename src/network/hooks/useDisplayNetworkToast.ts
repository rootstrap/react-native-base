import { toast } from 'burnt';
import type { ToastOptions } from 'burnt/build/types';

import useNetworkStatus from './useNetworkStatus';

const DEFAULT_OPTIONS = {
  title: 'No internet connection',
  message: 'In order to use the app, you must have internet connection',
  preset: 'error',
  duration: 5,
} as ToastOptions;

const useDisplayNetworkToast = ({ options = DEFAULT_OPTIONS }) => {
  const { isOnline, isInternetReachable } = useNetworkStatus();
  const isConnected: boolean = isOnline || isInternetReachable;

  if (!isConnected) {
    toast(options);
  }
};

export default useDisplayNetworkToast;
