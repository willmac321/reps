import {
  collection,
  addDoc,
  query,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
  where,
  deleteDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase/config';

async function updateExercise(uid, exercise) {
  return updateDoc(doc(db, 'users', uid, 'exercises', exercise.id), exercise)
    .then(() => exercise.id)
    .catch((e) => console.error(e));
}

async function batchUpdateExercises(uid, exercises) {
  const batch = writeBatch(db);
  exercises.forEach((exercise) => {
    const updEx = doc(db, 'users', uid, 'exercises', exercise.id);
    batch.update(updEx, exercise);
  });
  await batch.commit();
}

// auth is handled by firebase
async function newExercise(uid, exercise, workoutId) {
  const docRef = await addDoc(collection(db, 'users', uid, 'exercises'), exercise);
  await updateDoc(doc(db, 'users', uid, 'workouts', workoutId), {
    exercises: arrayUnion(docRef.id),
  });

  const r = await getDoc(doc(db, 'users', uid, 'workouts', workoutId));
  if (r.exists()) {
    const tempExercise = exercise;
    tempExercise.id = docRef.id;
    tempExercise.index = r.data().exercises.findIndex((el) => el === docRef.id);
    updateExercise(uid, tempExercise);
    return tempExercise;
  }
  return {};
}

async function getExercises(uid, workoutId) {
  if (!workoutId) return [];
  const workout = await getDoc(doc(db, 'users', uid, 'workouts', workoutId));
  if (workout.exists) {
    const workoutData = workout.data();
    if (!workoutData || workoutData.exercises.length === 0) return [];
    const { exercises } = { ...workoutData };
    const rvExercises = [];
    const promises = [];
    // max 30 disjunctions with in - and or combo
    const limit = 30;
    while (exercises.length > 0) {
      const ex = exercises.slice(0, limit);
      exercises.splice(0, limit);
      promises.push(
        getDocs(query(collection(db, 'users', uid, 'exercises'), where('id', 'in', ex))).then(
          (res) => {
            const updateExercises = res.docs.map((exercise) => ({
              ...exercise.data(),
              id: exercise.id,
            }));
            rvExercises.push(...updateExercises);
          }
        )
      );
    }
    await Promise.all(promises);
    rvExercises.sort((a, b) => a.index - b.index);
    return rvExercises;
  }
  throw Error('No exercise data exists');
}

async function deleteExercise(uid, exercise, workoutId, newExerciseList) {
  await deleteDoc(doc(db, 'users', uid, 'exercises', exercise));
  await updateDoc(doc(db, 'users', uid, 'workouts', workoutId), {
    exercises: newExerciseList,
  });
}

export default {
  batchUpdateExercises,
  updateExercise,
  newExercise,
  deleteExercise,
  getExercises,
};
