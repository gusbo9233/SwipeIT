import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthProvider';
import { authService } from '../service/authService';
import type { User } from '../types/User';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());

  const login = async (e: string, p: string) => {
    const loggedInUser = await authService.login(e, p);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
