import React from 'react';
import { View, Text } from 'react-native';

const TestScreen = () => {
  return (
    <View testID={'test-screen'}>
      <Text testID={'test-text'}>TEST SCREEN</Text>
    </View>
  );
};

export default TestScreen;
