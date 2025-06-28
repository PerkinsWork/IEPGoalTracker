import { signInEmail } from '../services/auth';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

auth.getAuth.mockReturnValue({});

auth.signInWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } });

firestore.doc.mockReturnValue('docref');
firestore.getDoc.mockResolvedValue({ exists: () => false });
firestore.setDoc.mockResolvedValue();

test('creates user doc on first login', async () => {
  await signInEmail('a@b.com', 'pw');
  expect(firestore.setDoc).toHaveBeenCalledWith('docref', { subscriptionTier: 'Solo', seatsAllowed: 1, seatsUsed: 1 });
});
