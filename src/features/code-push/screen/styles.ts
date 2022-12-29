import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 105,
    resizeMode: 'contain',
  },
  updateMessage: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 10,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 25,
  },
});
