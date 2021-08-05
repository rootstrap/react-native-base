import React from 'react';
import { bool, string } from 'prop-types';

import Text from 'components/common/Text';

import styles from './InputLabel.styles';

const Label = ({ text, withRequiredIndicator = false }) => (
  <Text accessible={false} style={styles.container}>
    {`${text}${withRequiredIndicator ? ' *' : ''}`}
  </Text>
);

Label.propTypes = {
  text: string.isRequired,
  withRequiredIndicator: bool,
};

export default Label;
