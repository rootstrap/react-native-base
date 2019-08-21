import { StyleSheet } from 'react-native';
import { ERROR } from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 12,
  },
  error: {
    color: ERROR,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
});

export default styles;
