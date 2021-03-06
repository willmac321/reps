import { db } from '../firebase/config';

// auth is handled by firebase
function updateWorkout(workout) {}
async function newWorkout(uid, workout) {
  // get ref to any existing doc
  const workoutRef = db.collection('users').doc(uid).collection('workouts').doc(workout.title);
  // using title instead of an auto uuid because the workout titles should be unique so that multiple workouts aren't named the same
  return workoutRef
    .get()
    .then((workoutRes) => {
      if (workoutRes.exists) {
        return workoutRes.data();
      }
      workoutRef.set(workout);
      return workout;
    })
    .catch((e) => {
      console.error(e);
      return e;
    });
}

async function getWorkouts(uid) {
  return db
    .collection('users')
    .doc(uid)
    .collection('workouts')
    .get()
    .then((res) => res.docs.map((doc) => doc.data()))
    .catch((e) => e);
}

function deleteWorkout(workout) {}

export default {
  updateWorkout,
  newWorkout,
  deleteWorkout,
  getWorkouts,
};
