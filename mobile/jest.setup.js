import 'react-native-gesture-handler/jestSetup';

// Mock Reanimated
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

// Mock Expo modules WITHOUT importing them
jest.mock('expo-constants', () => ({ manifest: {}, appOwnership: 'standalone' }));

// Do NOT import expo-secure-store — just mock it like this
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
