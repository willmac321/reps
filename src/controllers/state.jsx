import React from 'react';
import { firebase } from '../firebase/config';
import API from './AuthApi';
import themeDark from '../theme/themeDark';
import themeLight from '../theme/themeLight';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  // used to spoof endpoints and user auth for dev,
  // XXX leave compare to dev string in case I forget!
  const [debug] = React.useState(process.env.NODE_ENV === 'development' && false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [authRes, setAuthRes] = React.useState(null);
  const [user, setUser] = React.useState(null);

  // default user state, use this on account create and overwrite after login
  const [defaultUserDetails] = React.useState({
    theme: 'light',
    ackPrivacyPolicy: false,
    splashScreenIcon: 'aphrodite',
    timeout: false,
    contactEmail: 'help@loblollysoftware.com',
  });

  const [userDetails, setUserDetails] = React.useState({
    theme: 'light',
    ackPrivacyPolicy: false,
    splashScreenIcon: 'aphrodite',
    timeout: false,
    contactEmail: 'help@loblollysoftware.com',
  });

  const theme = userDetails.theme !== 'light' ? themeDark : themeLight;

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
    ['456', '234'].map((k) => ({
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
    if (!w) {
      updateSelectedWorkout({});
      return;
    }
    let isAlreadyThere = false;
    const unsortedWorkouts = workouts.map((a) => {
      if (a.id === w.id) {
        isAlreadyThere = true;
        return w;
      }
      return a;
    });
    updateSelectedWorkout(w);
    if (!isAlreadyThere) unsortedWorkouts.push(w);
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

  React.useEffect(() => {
    // NOTE debug related might need to take this out
    if (!debug) {
      firebase.auth().onAuthStateChanged((res) => {
        setIsLoading(false);
        setAuthRes(res);
      });
    } else {
      setIsLoading(false);
      setUser({ uid: '123' });
    }
  }, []);

  React.useEffect(() => {
    if (authRes && !authRes.emailVerified && !justRegistered) {
      API.logout(() => {});
      // NOTE debug related might take this out
      if (!debug) {
        setUser(null);
      }
      return;
    }
    if (authRes && !authRes.emailVerified && justRegistered) {
      authRes.sendEmailVerification();
      setJustRegistered(false);
    }
    // NOTE debug related might take this out
    if (!debug) {
      setUser(authRes);
    }
  }, [authRes]);

  return (
    <StateContext.Provider
      value={{
        debug,
        isLoading,
        setIsLoading: () => setIsLoading(!isLoading),
        user,
        defaultUserDetails,
        userDetails,
        setUserDetails,
        setJustRegistered,
        workouts: { workouts, setWorkouts },
        exercises: { exercises, setExercises },
        selectedWorkout: { selectedWorkout, setSelectedWorkout },
        theme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
