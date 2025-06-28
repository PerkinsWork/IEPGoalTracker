import { sendInvite } from '../services/invites';
import { webhook } from '../functions';
import * as firestore from 'firebase/firestore';

jest.mock('../services/auth', () => ({ auth: { currentUser: { uid: 'u1' } } }));
jest.mock('firebase/firestore');
jest.mock('firebase-functions', () => ({
  https: { onRequest: (fn) => fn, onCall: (fn) => fn },
  HttpsError: class extends Error {}
}), { virtual: true });

jest.mock('firebase-admin', () => {
  const updateMock = jest.fn();
  const admin = {
    initializeApp: jest.fn(),
    firestore: jest.fn()
  };
  admin.firestore.mockReturnValue({
    doc: jest.fn(() => ({ update: updateMock }))
  });
  admin.firestore.FieldValue = { increment: jest.fn() };
  admin.__updateMock = updateMock;
  return admin;
}, { virtual: true });

jest.mock('stripe', () => {
  const constructEvent = jest.fn();
  const Stripe = jest.fn().mockImplementation(() => ({
    webhooks: { constructEvent }
  }));
  Stripe.__constructEvent = constructEvent;
  return Stripe;
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('creates invite when seats available', async () => {
  firestore.getDoc.mockResolvedValue({ data: () => ({ seatsUsed: 0, seatsAllowed: 2 }) });
  firestore.setDoc.mockResolvedValue();
  firestore.doc.mockReturnValue('docref');

  await sendInvite('x@y.com');
  expect(firestore.setDoc).toHaveBeenCalled();
});

test('rejects invite when seat limit reached', async () => {
  firestore.getDoc.mockResolvedValue({ data: () => ({ seatsUsed: 2, seatsAllowed: 2 }) });
  await expect(sendInvite('x@y.com')).rejects.toThrow('no seats available');
});

test('webhook updates subscription fields', async () => {
  const Stripe = require('stripe');
  Stripe.__constructEvent.mockReturnValue({
    type: 'checkout.session.completed',
    data: { object: { metadata: { uid: 'u1', seats: '3' }, customer: 'cus_1' } }
  });
  const req = { headers: { 'stripe-signature': 'sig' }, rawBody: Buffer.from('') };
  const res = { status: jest.fn(() => res), send: jest.fn(), sendStatus: jest.fn() };

  await webhook(req, res);

  const admin = require('firebase-admin');
  expect(admin.__updateMock).toHaveBeenCalledWith({
    subscriptionTier: 'Team',
    seatsAllowed: 3,
    seatsUsed: 1,
    customerId: 'cus_1'
  });
});

