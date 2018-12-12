import { createSelector } from 'reselect';

export const getUser = createSelector(
  state => state.getIn(['session', 'user']),
  user => user.toJS()
);
