import { doc, updateDoc, setDoc, getDocs, deleteDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// auth is handled by firebase
async function updateWorkout(uid, workout) {
  await updateDoc(doc(db, 'users', uid, 'workouts', workout.id), workout);
  return workout.id;
}

async function newWorkout(uid, workout) {
  // get ref to any existing doc
  // using title instead of an auto uuid because the workout titles should be unique so that multiple workouts aren't named the same
  const workoutRef = doc(db, 'users', uid, 'workouts', workout.title);
  const w = await setDoc(workoutRef, workout);
  return w;
}

async function getWorkouts(uid) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'workouts'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function getWorkout(uid, workoutId) {
  const snapshot = await getDoc(doc(db, 'users', uid, 'workouts', workoutId));
  return snapshot;
}

async function deleteWorkout(uid, workoutId) {
  if (workoutId) {
    await deleteDoc(doc(db, 'users', uid, 'workouts', workoutId));
  }
}

export default {
  updateWorkout,
  newWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkout,
};
