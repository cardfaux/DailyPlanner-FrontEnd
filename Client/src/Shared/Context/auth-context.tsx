import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: boolean | undefined;
  userName: string | undefined;
  token: boolean | undefined;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
