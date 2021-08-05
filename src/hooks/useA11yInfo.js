import { useState, useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

const useA11yInfo = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  const handleReduceMotionToggled = enabled => {
    setReduceMotionEnabled(enabled);
  };

  const handleScreenReaderToggled = enabled => {
    setScreenReaderEnabled(enabled);
  };

  useEffect(() => {
    AccessibilityInfo.addEventListener('reduceMotionChanged', handleReduceMotionToggled);
    AccessibilityInfo.addEventListener('screenReaderChanged', handleScreenReaderToggled);

    AccessibilityInfo.isReduceMotionEnabled().then(handleReduceMotionToggled);
    AccessibilityInfo.isScreenReaderEnabled().then(handleScreenReaderToggled);

    return () => {
      AccessibilityInfo.removeEventListener('reduceMotionChanged', handleReduceMotionToggled);
      AccessibilityInfo.removeEventListener('screenReaderChanged', handleScreenReaderToggled);
    };
  }, []);

  return {
    reduceMotionEnabled,
    screenReaderEnabled,
  };
};

export default useA11yInfo;
