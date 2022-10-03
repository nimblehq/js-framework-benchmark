import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import type { User } from '@prisma/client';

export type UserState = User | undefined;

export type UserContextValue = {
  user: UserState;
  setUser: Dispatch<SetStateAction<UserState>>;
};

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => undefined,
});

export const useUser = () => useContext(UserContext);
