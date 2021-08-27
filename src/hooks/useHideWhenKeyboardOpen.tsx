import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useHideWhenKeyboardOpen = () => {
    const [isKeyboadVisible, setIsKeyboadVisible] = useState(false);

    const _keyboardDidShow = useCallback(() => {
        setIsKeyboadVisible(true);
    }, []);

    const _keyboardDidHide = useCallback(() => {
        setIsKeyboadVisible(false);
    }, []);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        };
    }, [_keyboardDidHide, _keyboardDidShow]);

    return isKeyboadVisible;
};

export default useHideWhenKeyboardOpen;
