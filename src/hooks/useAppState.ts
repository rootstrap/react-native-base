import { useCallback, useEffect } from 'react';
import { AppState } from 'react-native';

const useAppState = (settings: {
    onChange: Function;
    onForeground: Function;
    onBackground: Function;
}) => {
    const { onChange, onForeground, onBackground } = settings || {};

    const isValidFunction = (func: Function) => {
        return func && typeof func === 'function';
    };

    const handleAppStateChange = useCallback(
        (nextAppState) => {
            if (nextAppState === 'active') {
                isValidFunction(onForeground) && onForeground();
            } else if (nextAppState.match(/inactive|background/)) {
                isValidFunction(onBackground) && onBackground();
            }
            isValidFunction(onChange) && onChange(nextAppState);
        },
        [onBackground, onChange, onForeground],
    );

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => AppState.removeEventListener('change', handleAppStateChange);
    }, [handleAppStateChange]);
};

export default useAppState;
