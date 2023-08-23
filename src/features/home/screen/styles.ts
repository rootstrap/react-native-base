import { StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    button: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 40,
      height: 40,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.action,
    },
  });
};

export default useStyles;
