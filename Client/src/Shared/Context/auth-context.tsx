import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: boolean;
  userName: string | undefined;
  token: boolean | undefined;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
