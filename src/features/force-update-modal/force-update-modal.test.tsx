import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import { ForceUpdateModal } from './force-update-modal';

describe('force-update', () => {
  it('renders correctly', () => {
    const component = render(<ForceUpdateModal />);
    expect(component).toBeTruthy();
  });
});
