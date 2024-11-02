import { User } from 'firebase/auth';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type ChildrenProps = {
  children: ReactNode;
};

interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
const initialUser = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<IUserContext>(initialUser);

export const UserProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User | null>(initialUser.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
