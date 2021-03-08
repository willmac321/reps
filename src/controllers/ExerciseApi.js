import { db, fieldValue, fieldPath } from '../firebase/config';

// auth is handled by firebase
async function newExercise(uid, exercise, workoutId) {
  return db
    .collection('users')
    .doc(uid)
    .collection('exercises')
    .add(exercise)
    .then((docRef) => {
      // add the uid to workout
      db.collection('users')
        .doc(uid)
        .collection('workouts')
        .doc(workoutId)
        .update({
          exercises: fieldValue.arrayUnion(docRef.id),
        })
        .catch((e) => console.error(e));
      return docRef.id;
    })
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

function deleteExercise(workout) {}
function updateExercise(exercise) {}

export default {
  updateExercise,
  newExercise,
  deleteExercise,
  getExercises,
};
