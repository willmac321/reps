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

async function batchUpdateExercises(uid, exercises) {
  const batch = db.batch();
  exercises.forEach((exercise) => {
    const updEx = db.collection('users').doc(uid).collection('exercises').doc(exercise.id);
    batch.update(updEx, exercise);
  });
  await batch.commit();
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

async function getExercises(uid, workoutId) {
  if (!workoutId) return [];
  return db
    .collection('users')
    .doc(uid)
    .collection('workouts')
    .doc(workoutId)
    .get()
    .then(async (r) => {
      if (r.exists) {
        const workoutData = r.data();
        if (!workoutData || workoutData.exercises.length === 0) return [];
        const { exercises } = { ...workoutData };
        const rvExercises = [];
        const limit = 10;
        while (exercises.length > 0) {
          // eslint-disable-next-line
          const res = await db
            .collection('users')
            .doc(uid)
            .collection('exercises')
            .where(fieldPath.documentId(), 'in', exercises.slice(0, limit))
            .get();
          // eslint-disable-next-line
          const _rvExercises = res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          exercises.splice(0, limit);
          rvExercises.push(..._rvExercises);
        }
        return rvExercises;
      }
      throw Error('No exercise data exists');
    })
    .catch((e) => Error(e));
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
  batchUpdateExercises,
  updateExercise,
  newExercise,
  deleteExercise,
  getExercises,
};
