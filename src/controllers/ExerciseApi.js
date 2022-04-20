import { db, fieldValue, fieldPath } from '../firebase/config';

async function updateExercise(uid, exercise) {
  return db
    .collection('users')
    .doc(uid)
    .collection('exercises')
    .doc(exercise.id)
    .update(exercise)
    .then(() => exercise.id)
    .catch((e) => console.error(e));
}

// auth is handled by firebase
async function newExercise(uid, exercise, workoutId) {
  return db
    .collection('users')
    .doc(uid)
    .collection('exercises')
    .add(exercise)
    .then((docRef) =>
      // add the uid to workout
      db
        .collection('users')
        .doc(uid)
        .collection('workouts')
        .doc(workoutId)
        .update({
          exercises: fieldValue.arrayUnion(docRef.id),
        })
        .then(() =>
          // I hate it
          db
            .collection('users')
            .doc(uid)
            .collection('workouts')
            .doc(workoutId)
            .get()
            .then((r) => {
              if (r.exists) {
                const tempExercise = exercise;
                tempExercise.id = docRef.id;
                tempExercise.index = r.data().exercises.findIndex((el) => el === docRef.id);
                updateExercise(uid, tempExercise);
                return tempExercise;
              }
              return {};
            })
        )
        .catch((e) => console.error(e))
    )
    .catch((e) => console.error(e));
}

async function getExercises(uid, exerciseArr) {
  if (!exerciseArr || exerciseArr.length === 0) return [];
  return db
    .collection('users')
    .doc(uid)
    .collection('exercises')
    .where(fieldPath.documentId(), 'in', exerciseArr)
    .get()
    .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    .catch((e) => e);
}

async function deleteExercise(uid, exercise, workoutId, newExerciseList) {
  return db
    .collection('users')
    .doc(uid)
    .collection('exercises')
    .doc(exercise)
    .delete()
    .then(() => {
      db.collection('users')
        .doc(uid)
        .collection('workouts')
        .doc(workoutId)
        .update({
          exercises: newExerciseList,
        })
        .catch((e) => console.error(e));
      return 'ok';
    })
    .catch((e) => console.error(e));
}

export default {
  updateExercise,
  newExercise,
  deleteExercise,
  getExercises,
};
