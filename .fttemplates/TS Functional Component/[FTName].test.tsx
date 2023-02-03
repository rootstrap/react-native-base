import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import {<FTName | capitalize >} from './[FTName]'

describe('[FTName]', () => {
  it('renders correctly', () => {
    const component = render(<[FTName] />);
    expect(component).toBeTruthy();
  });

});
