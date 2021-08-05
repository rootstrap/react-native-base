import { StyleSheet } from 'react-native';

import { BLACK } from 'constants/colors';

const styles = StyleSheet.create({
  base: {
    color: BLACK,
  },
  noA11yPadding: {
    paddingVertical: 0,
  },
  H1: {
    fontSize: 28,
    fontWeight: '600',
    paddingVertical: 5,
  },
  H2: {
    fontSize: 22,
    fontWeight: '600',
  },
  H3: {
    fontSize: 20,
    fontWeight: '600',
  },
  H4: {
    fontSize: 17,
    fontWeight: '600',
    paddingVertical: 4,
  },
  Body: {
    fontSize: 17,
    paddingVertical: 12,
  },
  C1: {
    fontSize: 13,
    paddingVertical: 14,
  },
  C2: {
    fontSize: 11,
    paddingVertical: 16,
  },
});

export default styles;
