import accountCredentials from '../data/AccountCredentials.json';
import { hashPassword } from '../helper/authHelper';
import type { RawUser, User } from '../types/User';

const USER_KEY = 'swipeit_user';
const accounts = accountCredentials as RawUser[];

export const authService = {
  // New secure login method
  login: async (email: string, password: string): Promise<User | null> => {
    const user = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!user) return null;

    // Hash the entered password to compare with the "hashed" password in DB
    const inputHash = await hashPassword(password);

    // In a real app, your userCredentials.json would already contain SHA-256 strings
    if (inputHash === user.password) {
      const userSansPassword: User = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
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