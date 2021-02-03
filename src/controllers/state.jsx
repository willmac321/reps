import React from 'react';
import { firebase } from '../firebase/config';
import API from './AuthApi';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [authRes, setAuthRes] = React.useState(null);
  // FIXME
  // const [user, setUser] = React.useState(null);
  const [user, setUser] = React.useState({ uid: '123' });

  // TODO set this on get from api
  const [workouts, setWorkouts] = React.useState(
    [...Array(15).keys()].map((k) => ({
      id: k.toString(),
      title: `workout ${k}`,
      date: Date.now().toLocaleString(),
      exercises: ['456', '234'],
    }))
  );
  // TODO set this on get from api
  // and sort it based on name or something
  const [exercises, updateExercises] = React.useState(
    [...Array(15).keys()].map((k) => ({
      parentWorkoutIds: [],
      id: k.toString(),
      title: `exercise ${k}`,
      sets: 7 - Math.floor(Math.random() * 6 + 1),
      repRange: [4, 10],
      rest: 45 - Math.floor(Math.random() * 15 + 1),
    }))
  );

  const [selectedWorkout, updateSelectedWorkout] = React.useState({});

  // update local workouts at the same time
  const setSelectedWorkout = (w) => {
    const unsortedWorkouts = workouts.map((a) => a);
    updateSelectedWorkout(w);
    unsortedWorkouts.push(w);
    setWorkouts(() => unsortedWorkouts.sort((a, b) => a.title.localeCompare(b.title)));
  };
  const setExercises = (ex, id = -1) => {
    // for local state
    // add exercise to list
    // add exercise uid to workout
    updateExercises([...exercises, ex]);
    // update selected workout exercise array
    const currExercise = selectedWorkout.exercises.slice();
    if (currExercise.indexOf(ex.id) > -1) {
      currExercise.splice(currExercise.indexOf(ex.id), 1);
    }
    if (id > -1) {
      currExercise.splice(id, 0, ex.id);
    } else {
      currExercise.push(ex.id);
    }
    setSelectedWorkout({ ...selectedWorkout, exercises: currExercise });
    // update workouts array too
    setWorkouts(() =>
      workouts.map((w) => {
        if (w.id === selectedWorkout.id) {
          return selectedWorkout;
        }
        return w;
      })
    );
  };

  // FIXME
  //  React.useEffect(() => {
  //    firebase.auth().onAuthStateChanged((res) => {
  //      setIsLoading(false);
  //      setAuthRes(res);
  //    });
  //  }, []);

  React.useEffect(() => {
    if (authRes && !authRes.emailVerified && !justRegistered) {
      API.logout(() => {});
      // FIXME
      // setUser(null);
      return;
    }
    if (authRes && !authRes.emailVerified && justRegistered) {
      authRes.sendEmailVerification();
      setJustRegistered(false);
    }
    // FIXME
    // setUser(authRes);
  }, [authRes]);

  return (
    <StateContext.Provider
      value={{
        isLoading,
        setIsLoading: () => setIsLoading(!isLoading),
        user,
        setJustRegistered,
        workouts: { workouts, setWorkouts },
        exercises: { exercises, setExercises },
        selectedWorkout: { selectedWorkout, setSelectedWorkout },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
