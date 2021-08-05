import React from 'react';
import { Text as RNText } from 'react-native';

import { arrayOf, bool, instanceOf, oneOf, oneOfType, string } from 'prop-types';
import styles from './Text.styles';

const H1 = 'H1';
const H2 = 'H2';
const H3 = 'H3';
const H4 = 'H4';

const BODY = 'Body';

const C1 = 'C1';
const C2 = 'C2';

const heading = [H1, H2, H3, H4];
const captions = [C1, C2];

export const contentShape = oneOf([...heading, BODY, ...captions]);

const Text = ({ as = BODY, children, style = {}, noA11yPadding = false, ...otherProps }) => {
  const isHeader = heading.includes(as);
  return (
    <RNText
      {...otherProps}
      accessibilityRole={isHeader ? 'header' : 'none'}
      style={[styles.base, styles[as], noA11yPadding && styles.noA11yPadding, style]}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  as: contentShape,
  children: oneOfType([string, instanceOf(Text), instanceOf(RNText)]),
  style: oneOfType([arrayOf(RNText.propTypes.style), RNText.propTypes.style]),
  noA11yPadding: bool,
};

export default Text;
