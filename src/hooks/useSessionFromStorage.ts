import storage, { StoreKeys, parser } from 'storage';

export const useSessionFromStorage = () => {
  const value = storage.getString(StoreKeys.session);
  return value ? parser.session(value) : null;
};
