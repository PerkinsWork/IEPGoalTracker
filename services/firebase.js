import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline persistence with indexedDB if available. In tests, the
// Firestore module is often mocked so this function may be undefined.
if (typeof enableIndexedDbPersistence === 'function') {
  try {
    // ignore any persistence errors, e.g. running in an unsupported environment
    enableIndexedDbPersistence(db).catch(() => {});
  } catch (e) {
    /* noop */
  }
}

export { db, AsyncStorage };
