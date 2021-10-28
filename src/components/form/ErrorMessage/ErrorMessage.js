import React from 'react';
import { string } from 'prop-types';

import { IOS } from 'utils/platform';
import useAnnounceChangeForA11y from 'hooks/useAnnounceChangeForA11y';
import Text from 'components/common/Text';

import styles from './ErrorMessage.styles';

const ErrorMessage = ({ message }) => {
  useAnnounceChangeForA11y(message, IOS);
  return (
    <Text
      as="C1"
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessible={!!message}
      accessibilityLabel="form-error">
      {message}
    </Text>
  );
};

ErrorMessage.propTypes = {
  message: string,
};

export default ErrorMessage;
