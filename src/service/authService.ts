import accountsData from '../data/Account.json';
import { hashPassword } from '../helper/authHelper';
import type { RawAccount, User } from '../types/Account';

const USER_KEY = 'swipeit_user';
const accounts = accountsData as RawAccount[];

export const authService = {
  // New secure login method
  login: async (email: string, password: string): Promise<User | null> => {
    const account = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!account) return null;

    // Hash the entered password to compare with the "hashed" password in DB
    const inputHash = await hashPassword(password);

    // In a real app, your Account.json would already contain SHA-256 strings
    if (inputHash === account.password) {
      const userSansPassword: User = {
        id: account.id,
        email: account.email,
        role: account.role,
        name: account.name
      };

      localStorage.setItem(USER_KEY, JSON.stringify(userSansPassword));
      return userSansPassword;
    }

    return null;
  },

  // this is for test only and shall be remove before production!
  loginByEmail: (email: string): User | null => {
    const user = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );

    if (user) {
      // Destructure to remove password from the object we store
        const userSansPassword: User = { ...user };
        
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(userSansPassword));
      } catch (error) {
        console.error("Failed to save user to storage:", error);
      }
      
      return userSansPassword as User;
    }
    return null;
  },

  getCurrentUser: (): User | null => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to parse user from storage:", error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  }
};