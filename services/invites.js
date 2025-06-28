import { collection, doc, setDoc, deleteDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './auth';
import { v4 as uuid } from 'uuid';

export async function sendInvite(email) {
  const token = uuid();
  await setDoc(doc(db, 'invites', token), { uid: auth.currentUser.uid, email, status: 'pending' });
  return token;
}

export async function acceptInvite(token) {
  const ref = doc(db, 'invites', token);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Invalid invite');
  await deleteDoc(ref);
  const { uid } = snap.data();
  await updateDoc(doc(db, 'users', uid), { seatsUsed: increment(1) });
}
