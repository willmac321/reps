import { db } from '../firebase/config';

// auth is handled by firebase
function updateWorkout(workout) {}
async function newWorkout(uid, workout) {
  return db
    .collection('users')
    .doc(uid)
    .collection('workouts')
    .add(workout)
    .then((docRef) => docRef.id)
    .catch((e) => console.error(e));
}
function deleteWorkout(workout) {}
function getWorkouts() {}

export default {
  updateWorkout,
  newWorkout,
  deleteWorkout,
  getWorkouts,
};
