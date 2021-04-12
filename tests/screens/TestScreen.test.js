import React from 'react';
import TestScreen from 'screens/TestScreen';
import { render } from '@testing-library/react-native';

describe('<TestScreen/>', () => {
  let screen;
  beforeEach(() => {
    screen = render(<TestScreen/>);
  })

  it('should render testScreen', () => {
    expect(screen.queryByTestId('test-screen')).toBeTruthy();
  })

  it('should show test test', () => {
    expect(screen.queryByTestId('test-text')).toBeTruthy();
  })
})
