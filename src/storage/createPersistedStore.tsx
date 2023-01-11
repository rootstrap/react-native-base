import { MMKV } from 'react-native-mmkv';
import { StateStorage, createJSONStorage } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

const storage = new MMKV();

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const persistStore = <T,>(store: StateCreator<T>, name: string) =>
  persist(store, {
    name: name, // unique name
    storage: createJSONStorage(() => zustandStorage),
  });
