import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

import { BOTH_PLATFORMS, platformEnabler } from 'utils/platform';

const useAnnounceChangeForA11y = (announcement, platform = BOTH_PLATFORMS, extraDeps = []) => {
  const enabledForPlatform = platformEnabler(platform);

  useEffect(() => {
    if (announcement && enabledForPlatform) {
      AccessibilityInfo.announceForAccessibility(announcement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement, enabledForPlatform, ...extraDeps]);
};

export default useAnnounceChangeForA11y;
