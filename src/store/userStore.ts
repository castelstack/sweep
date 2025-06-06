import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import type { StateCreator } from 'zustand';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

interface UserState {
  currentUser: IUser | null;
}

interface UserActions {
  setCurrentUser: (value: IUser | null) => void;
}

type UserStore = UserState & UserActions;

// The core store logic
const store: StateCreator<UserStore> = (set) => ({
  currentUser: null,
  setCurrentUser: (value) => set({ currentUser: value }),
});

export const useUserStore = create<UserStore>()(
  devtools(
    persist(store, {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    })
  )
);
