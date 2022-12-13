import { MMKV, useMMKVString } from 'react-native-mmkv';

const GlobalStoreKeys = {
  user: 'user',
  other: 'other',
} as const;

export type GlobalStoreKeys = keyof typeof GlobalStoreKeys;

export type StorageInstance<TKeys extends string> = {
  get: (key: TKeys) => string | undefined;
  set: (key: TKeys, value: string) => void;
  delete: (key: TKeys) => void;
  deletePartial: (keys: TKeys[]) => void;
  clearAll: () => void;
  useValueListener: (
    key: TKeys,
  ) => [
    value: string | undefined,
    setValue: (
      value: string | ((current: string | undefined) => string | undefined) | undefined,
    ) => void,
  ];
};

const createStorageInstance = <TKeys extends string>(id?: string): StorageInstance<TKeys> => {
  const instance = new MMKV(id ? { id } : undefined);

  return {
    get: key => instance.getString(key),
    set: (key, value) => instance.set(key, value),
    delete: key => instance.delete(key),
    deletePartial: keys => keys.forEach(key => instance.delete(key)),
    clearAll: () => instance.clearAll(),
    useValueListener: (
      key,
    ): [
      value: string | undefined,
      setValue: (
        value: string | ((current: string | undefined) => string | undefined) | undefined,
      ) => void,
    ] => useMMKVString(key, instance),
  };
};

// NOTE: in case you need to create multiple stores, you can do it like this:
/*
  ProfileStorageInstance = createStorageInstance<Keys>('profile');
*/

const StoreInstances = {
  GlobalStorageInstance: createStorageInstance<GlobalStoreKeys>(),
};

export default StoreInstances;
