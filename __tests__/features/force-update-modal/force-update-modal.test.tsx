import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import { ForceUpdateModal } from '../../../src/features/force-update-modal/force-update-modal';

describe('force-update', () => {
  it('renders correctly', () => {
    const modal = render(<ForceUpdateModal />);

    expect(modal).toBeTruthy();
  });
});
