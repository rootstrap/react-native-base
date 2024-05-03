import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import { translate } from 'localization/hooks';

import { ForceUpdateModal } from './force-update-modal';

describe('force-update', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ForceUpdateModal />);
    expect(getByText(translate('buttons.ok'))).toBeTruthy();
  });
});
