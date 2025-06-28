import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db, AsyncStorage } from './firebase';

const QUEUE_KEY = 'offlineQueue';

async function enqueue(op) {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  const list = raw ? JSON.parse(raw) : [];
  list.push(op);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(list));
}

async function flushQueue() {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!raw) return;
  const list = JSON.parse(raw);
  await AsyncStorage.removeItem(QUEUE_KEY);
  for (const op of list) {
    await perform(op);
  }
}

async function perform({ type, args }) {
  switch (type) {
    case 'addStudent':
      return addStudent(...args);
    case 'addGoal':
      return addGoal(...args);
    case 'addEntry':
      return addEntry(...args);
    default:
      break;
  }
}

export async function addStudent(data) {
  try {
    await addDoc(collection(db, 'students'), data);
  } catch (err) {
    await enqueue({ type: 'addStudent', args: [data] });
  }
}

export function streamStudents(cb) {
  return onSnapshot(collection(db, 'students'), (snap) => {
    const students = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(students);
  });
}

export async function addGoal(studentId, data) {
  const col = collection(db, 'students', studentId, 'goals');
  try {
    await addDoc(col, data);
  } catch (err) {
    await enqueue({ type: 'addGoal', args: [studentId, data] });
  }
}

export async function addEntry(studentId, goalId, data) {
  const col = collection(db, 'students', studentId, 'goals', goalId, 'entries');
  try {
    await addDoc(col, data);
  } catch (err) {
    await enqueue({ type: 'addEntry', args: [studentId, goalId, data] });
  }
}

flushQueue();
export { flushQueue };
