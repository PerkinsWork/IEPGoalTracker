import { addStudent, flushQueue } from '../services/repository';
import * as firestore from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('firebase/firestore');

beforeEach(() => {
  AsyncStorage.setItem('offlineQueue', JSON.stringify([]));
});

test('queues offline writes and flushes later', async () => {
  firestore.addDoc.mockRejectedValueOnce(new Error('offline'));
  firestore.collection.mockReturnValue('col');

  await addStudent({ name: 'Test' });

  expect(JSON.parse(await AsyncStorage.getItem('offlineQueue')).length).toBe(1);

  firestore.addDoc.mockResolvedValueOnce({});
  await flushQueue();

  const q = await AsyncStorage.getItem('offlineQueue');
  expect(q).toBeNull();
});
