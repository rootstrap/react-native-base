import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// Wrapper component which hides child node when the device keyboard is open.
const useHideWhenKeyboardOpen = (BaseComponent: any) => (props: any) => {
    // todo: finish refactoring.....
    const [isKeyboadVisible, setIsKeyboadVisible] = useState(false);

    const _keyboardDidShow = () => {
        setIsKeyboadVisible(true);
    };

    const _keyboardDidHide = () => {
        setIsKeyboadVisible(false);
    };

    /**
     * Add callbacks to keyboard display events, cleanup in useeffect return.
     */
    useEffect(() => {
        console.log('isKeyboadVisible: ' + isKeyboadVisible);
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeCurrentListener();
        };
    }, [_keyboardDidHide, _keyboardDidShow]);

    return isKeyboadVisible ? null : <BaseComponent {...props}></BaseComponent>;
};

export default useHideWhenKeyboardOpen;
