import { NavigationActions } from 'react-navigation';
import Immutable from 'immutable';

import { AppNavigator } from '../navigation/AppNavigator';

const {
  getActionForPathAndParams,
  getStateForAction
} = AppNavigator.router;

const initialNavState = Immutable.fromJS(getStateForAction(getActionForPathAndParams('Login')));

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case '@@redux-react-session/SESSION_CHECKED_SUCCESS':
      nextState = getStateForAction(getActionForPathAndParams('Main'));
      break;
    case 'LOGIN_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })]
        }),
        state.toJS()
      );
      break;
    case 'LOGOUT_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })]
        }),
        state.toJS()
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state.toJS());
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState ? Immutable.fromJS(nextState) : state;
};

export default nav;
