import { useSelector } from 'react-redux';
import { LOADING } from 'constants/status';

const useLoading = action => useSelector(({ actionStatus }) => {
  const { status } = actionStatus[action] || {};
  return status === LOADING;
});

export default useLoading;
