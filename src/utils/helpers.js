import { Alert } from 'react-native';
import messages from './messages';

export function alertErrors(message_) {
  const message = message_ ? messages[message_] : 'An error occurred while processing your request. Try again later.';
  Alert.alert(
    'Error ', message,
    [{ text: 'OK' }],
    { cancelable: false }
  );
}

export function alertSuccess(message_) {
  const message = message_ ? messages[message_] : 'Your action has been successfully completed.';
  Alert.alert(
    'Success', message,
    [{ text: 'OK' }],
    { cancelable: false }
  );
}
