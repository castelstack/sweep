import { type StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
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

interface UserSelectors {}

type UserStore = UserState & UserActions & UserSelectors;

type StoreMiddleware = [['zustand/devtools', { name: string }]];

const store: StateCreator<UserStore, StoreMiddleware> = (set) => ({
  currentUser: null,
  setCurrentUser: (value: IUser | null) => set({ currentUser: value }),
});

const useUserStore = create<UserStore>()(
  devtools(
    persist(store, {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export { useUserStore };
