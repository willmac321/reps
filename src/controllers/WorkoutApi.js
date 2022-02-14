import { db } from '../firebase/config';

// auth is handled by firebase
function updateWorkout(uid, workout) {}

async function newWorkout(uid, workout) {
  // get ref to any existing doc
  const workoutRef = db.collection('users').doc(uid).collection('workouts').doc(workout.title);
  // using title instead of an auto uuid because the workout titles should be unique so that multiple workouts aren't named the same
  return workoutRef
    .set(workout)
    .then((w) => w)
    .catch((e) => e);

  // TODO does this need to be done?
  // return workoutRef
  //  .get()
  //  .then((workoutRes) => {
  //    if (workoutRes.exists) {
  //      return workoutRes.data();
  //    }
  //    workoutRef.set(workout);
  //    return workout;
  //  })
  //  .catch((e) => {
  //    console.error(e);
  //    return e;
  //  });
}

async function getWorkouts(uid) {
  return db
    .collection('users')
    .doc(uid)
    .collection('workouts')
    .get()
    .then((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    .catch((e) => e);
}

function deleteWorkout(uid, workoutId) {
  if (!workoutId) {
    return null;
  }
  return db.collection('users').doc(uid).collection('workouts').doc(workoutId).delete();
}

export default {
  updateWorkout,
  newWorkout,
  deleteWorkout,
  getWorkouts,
};
