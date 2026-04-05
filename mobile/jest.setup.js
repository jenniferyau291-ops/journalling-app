import 'react-native-gesture-handler/jestSetup';

// Mock Reanimated so tests dont break
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  removeItemAsync: jest.fn(),
}));

// Mock Expo modules 
jest.mock('expo-constants', () => ({ manifest: {}, appOwnership: 'standalone' }));

// mocks secure storage
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
