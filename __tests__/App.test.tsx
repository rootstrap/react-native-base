import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });

  it('elements should be accessible', () => {
    const { getByText, getByRole } = render(<App />);
    const text = getByText('Welcome Screen');
    const button = getByRole('button');

    expect(text).toBeAccessible();
    expect(button).toBeAccessible();
  });
});
