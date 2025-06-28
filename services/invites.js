import { collection, doc, setDoc, deleteDoc, getDoc, updateDoc, increment, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './auth';
import { v4 as uuid } from 'uuid';

export async function sendInvite(email, role = 'member') {
  const userSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
  const user = userSnap.data();
  if (user.seatsUsed >= user.seatsAllowed) {
    throw new Error('no seats available');
  }
  const token = uuid();
  await setDoc(doc(db, 'invites', token), {
    uid: auth.currentUser.uid,
    email,
    role,
    status: 'pending'
  });
  return token;
}

export async function acceptInvite(token) {
  const ref = doc(db, 'invites', token);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Invalid invite');
  const { uid, email, role } = snap.data();
  await deleteDoc(ref);
  await addDoc(collection(db, 'users', uid, 'seats'), {
    email,
    role,
    status: 'active'
  });
  await updateDoc(doc(db, 'users', uid), { seatsUsed: increment(1) });
}
