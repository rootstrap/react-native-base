import { createSelectors } from 'store/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AUTH } from 'constants/storages';

import { User } from 'network/modules/user/models';

import { zustandStorage } from 'storage/zustand-storage';

export interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const _useAuth = create(
  persist<AuthState>(
    set => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: AUTH,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useAuth = createSelectors(_useAuth);

export const setUser = (user: User) => _useAuth.getState().setUser(user);
export const clearUser = () => _useAuth.getState().clearUser();
