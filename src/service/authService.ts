import accountsData from '../data/Account.json';
import type { RawAccount, User } from '../types/Account';

const USER_KEY = 'swipeit_user';

// Cast the JSON import to an array of any to allow destructuring later, 
// or define a full RawAccount interface if you want to be strict.
const accounts = accountsData as RawAccount[];

export const authService = {
  loginByEmail: (email: string): User | null => {
    const user = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase()
    );

    if (user) {
      // Destructure to remove password from the object we store
        const userSansPassword: User = { ...user };
        
        console.log("HEREEE REMOVE THIS");
        
        console.log(userSansPassword);
        
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
    // Optional: Force a reload or redirect to clear application state
    window.location.href = '/login';
  }
};