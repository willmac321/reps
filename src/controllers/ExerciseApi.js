import { db } from '../firebase/config';

// auth is handled by firebase
function updateExercise(exercise) {}
async function newExercise(uid, exercise, workoutUid) {
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
        .doc(workoutUid)
        .add(docRef.uid)
        .catch((e) => console.error(e));
      return docRef.id;
    })
    .catch((e) => console.error(e));
}
function deleteWorkout(workout) {}
function getWorkouts() {}

export default {
  updateExercise,
  newExercise,
  deleteWorkout,
  getWorkouts,
};
