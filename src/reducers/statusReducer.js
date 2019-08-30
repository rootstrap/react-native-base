import { produce } from 'immer';
import { NOT_STARTED, LOADING, SUCCESS, ERROR } from 'constants/status';

const handleAction = (state, action) => {
  const { type, error } = action;

  const matchesStart = /(.*)_(REQUEST)/.exec(type);
  const matchesError = /(.*)_(ERROR)/.exec(type);
  const matchesReset = /(.*)_(RESET)/.exec(type);
  const matchesSuccess = /(.*)_(SUCCESS)/.exec(type);

  let status = NOT_STARTED;
  let key = null;

  if (matchesStart) {
    const [, requestName] = matchesStart;
    key = requestName;
    status = LOADING;
  } else if (matchesReset) {
    const [, requestName] = matchesReset;
    key = requestName;
    status = NOT_STARTED;
  } else if (matchesError) {
    const [, requestName] = matchesError;
    key = requestName;
    status = ERROR;
  } else if (matchesSuccess) {
    const [, requestName] = matchesSuccess;
    key = requestName;
    status = SUCCESS;
  }

  if (key) state[key] = { status, error };

  return state;
};

export default (state = {}, action) => produce(state, draft => handleAction(draft, action));
