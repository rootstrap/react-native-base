import { StyleSheet } from 'react-native';
import { BLACK, RED } from 'constants/colors';

export default StyleSheet.create({
  input: { borderColor: BLACK, borderWidth: 1, minHeight: 44 },
  inputFocused: { borderWidth: 3 },
  inputWithError: { borderColor: RED },
  errorIndicator: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  error: {
    color: RED,
  },
});
