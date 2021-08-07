import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// HOC Components which hides child nodes when the device keyboard is open.
const hideWhenKeyboardOpen = (BaseComponent: any) => (props: any) => {
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
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeCurrentListener();
        };
    }, [_keyboardDidHide, _keyboardDidShow]);

    return isKeyboadVisible ? null : <BaseComponent {...props}></BaseComponent>;
};

export default hideWhenKeyboardOpen;
