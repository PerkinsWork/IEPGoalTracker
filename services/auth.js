import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fbSignOut, GoogleAuthProvider, OAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const auth = getAuth();

async function ensureUserDoc(user) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { subscriptionTier: 'Solo', seatsAllowed: 1, seatsUsed: 1 });
  }
}

export async function signInEmail(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(user);
  return user;
}

export async function signUpEmail(email, password) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(user);
  return user;
}

export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  await ensureUserDoc(user);
  return user;
}

export async function signInMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  const { user } = await signInWithPopup(auth, provider);
  await ensureUserDoc(user);
  return user;
}

export function signOut() {
  return fbSignOut(auth);
}

export function watchAuth(cb) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) await ensureUserDoc(user);
    cb(user);
  });
}

export { auth };
