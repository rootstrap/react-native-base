import { useSelector } from 'react-redux';

const useStatus = action =>
  useSelector(({ actionStatus }) => {
    const { status, error } = actionStatus[action] || {};
    return {
      status,
      error,
    };
  });

export default useStatus;
