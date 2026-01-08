import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USERS_KEY = 'users_data';
const SESSION_KEY = 'user_session';

// Simulate a delay to feel like an API
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export const AuthService = {
  async register(email: string, password: string): Promise<User> {
    await delay(500);
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      if (users.find((u) => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser: User = { id: Date.now().toString(), email, password };
      users.push(newUser);
      
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Auto login after register
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      return newUser;
    } catch (e) {
      throw e;
    }
  },

  async login(email: string, password: string): Promise<User> {
    await delay(500);
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find((u) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    } catch (e) {
      throw e;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  },

  async getSession(): Promise<User | null> {
    try {
      const sessionJson = await AsyncStorage.getItem(SESSION_KEY);
      return sessionJson ? JSON.parse(sessionJson) : null;
    } catch (e) {
      return null;
    }
  }
};
