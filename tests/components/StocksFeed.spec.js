
import React from 'react';
import StocksFeed from 'components/StocksFeed';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithRedux, configureStore } from '../helpers';

describe('<StocksFeed />', () => {
  let wrapper;
  let store;
  const props = {
  };

  beforeEach(() => {
    store = configureStore();
    wrapper = renderWithRedux(<StocksFeed {...props} />, store);
  });

  describe('Email Input', () => {
    let gridsterGrid;
    beforeEach(() => {
      // gridsterGrid = wrapper.queryByTestId('email-input');
    });

    it('should display a 4 grid layout', () => {
      // expect(input).toBeTruthy();
    });

    xdescribe('when the email input is valid', () => {
      beforeEach(() => {
        fireEvent.changeText(input, 'example@rootstrap.com');
        fireEvent(input, 'blur');
      });

      it('should show a email is not valid error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(0);
        expect(wrapper.queryByText('Email is not a valid email')).toBeNull();
        expect(wrapper.queryByText("Email can't be blank")).toBeNull();
      });
    });

    xdescribe('when the email input is not present', () => {
      beforeEach(() => {
        fireEvent(input, 'blur');
      });

      it('should show a required error', () => {
        expect(wrapper.queryAllByLabelText('form-error')).toHaveLength(1);
        expect(wrapper.queryByText("Email can't be blank")).toBeTruthy();
      });
    });
  });


});
