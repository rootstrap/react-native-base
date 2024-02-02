import { StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    optionTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
      color: colors.text,
      alignSelf: 'flex-start',
    },
    option: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button: {
      width: '100%',
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.primary,
      marginBottom: 20,
    },
    disabledButton: {
      backgroundColor: colors.disabled,
    },
    buttonText: {
      fontWeight: 'bold',
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 10,
    },
    switchText: {
      fontSize: 16,
      color: colors.text,
    },
    label: {
      fontSize: 12,
      color: colors.text,
    },
  });
};

export default useStyles;
