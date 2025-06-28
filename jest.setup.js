jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => {}, { virtual: true });
// Provide a simple in-memory mock for AsyncStorage so tests don't require the
// native module. The library ships its own mock which works well in Jest.
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

process.env.FIREBASE_API_KEY = 'test';
process.env.FIREBASE_AUTH_DOMAIN = 'test';
process.env.FIREBASE_PROJECT_ID = 'test';
process.env.FIREBASE_STORAGE_BUCKET = 'test';
process.env.FIREBASE_MESSAGING_SENDER_ID = 'test';
process.env.FIREBASE_APP_ID = 'test';
