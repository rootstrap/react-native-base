import { StyleSheet } from 'react-native';

import { BLUE, GREY_01, GREY_02, WHITE } from 'constants/styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    backgroundColor: BLUE,
    width: '80%',
    margin: 10,
  },
  disabledContainer: {
    backgroundColor: GREY_01,
    borderColor: WHITE,
  },
  title: {
    color: WHITE,
  },
  disabledTitle: {
    color: GREY_02,
  },
});

export default styles;
