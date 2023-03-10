import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        const isConnected = !!state.isConnected;

        setOnline(isConnected); // react-query online state
        setIsOnline(isConnected);
        setIsInternetReachable(!!state.isInternetReachable);
      });
    });
  }, []);

  return {
    isInternetReachable,
    isOnline,
  };
};

export default useNetworkStatus;
