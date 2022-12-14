import StoreInstances, { GlobalStoreKeys, StorageInstance } from 'storage';

import { User } from 'network/modules/user/models';

import { useStoredValue, useStoredValueListener } from './hooks';

/// Stores

const getGenericMethods = <T, TKeys extends string>(
  key: TKeys,
  instance: StorageInstance<TKeys>,
) => ({
  useValue: () => useStoredValue<T, TKeys>({ key, instance }),
  useValueListener: () => useStoredValueListener<T, TKeys>({ key, instance }),
  setValue: (value: T) => {
    try {
      const _value = JSON.stringify(value);
      instance.set(key, _value);
    } catch (error) {
      throw new Error('error saving value');
    }
  },
  delete: () => instance.delete(key),
});

const getGlobalStore = (instance: StorageInstance<GlobalStoreKeys>) => ({
  user: getGenericMethods<User, GlobalStoreKeys>('user', instance),
});

export const GlobalStore = getGlobalStore(StoreInstances.GlobalStorageInstance);
