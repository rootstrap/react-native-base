import { persistStore } from 'storage/createPersistedStore';
import { create } from 'zustand';

import { Session, User } from './types';

// Example of a persistent zustand store with MMKV middleware (https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_ZUSTAND_PERSIST_MIDDLEWARE.md)
// You can create a non-persistent store by removing the persistStore function and the second argument (https://github.com/pmndrs/zustand#first-create-a-store)

export const useSessionStore = create<Session>()(
  persistStore(
    (set, get) => ({
      user: { firstName: 'Test', lastName: 'Guest' },
      updateUser: (user: User) =>
        set(state => ({
          user: {
            ...state.user,
            ...user,
          },
        })),
      getFullName: () => {
        const { firstName, lastName } = get().user;
        return `${firstName} ${lastName}`;
      },
    }),
    'session-store',
  ),
);
