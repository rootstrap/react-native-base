import { useSelector } from 'react-redux';

const useError = action => useSelector(({ actionStatus }) => {
  const { error } = actionStatus[action] || {};
  return error;
});

export default useError;
