import { createContext, useContext } from "react";
import type { User } from "../types/Account";

export const AuthContext = createContext<{
  user: User | null;
  login: (e: string, p: string) => Promise<boolean>;
  logout: () => void;
} | null>(null);

export const useAuth = () => useContext(AuthContext)!;
