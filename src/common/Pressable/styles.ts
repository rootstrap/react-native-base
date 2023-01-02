import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  commonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  pressed: {
    opacity: 0.2,
  },
  notPressed: {
    opacity: 1,
  },
});

export default styles;
