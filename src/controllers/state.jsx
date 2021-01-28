import React from 'react';
import { firebase } from '../firebase/config';
import API from './AuthApi';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [authRes, setAuthRes] = React.useState(null);
  const [user, setUser] = React.useState(null);

  // TODO set this on get from api
  const [workouts, setWorkouts] = React.useState(
    [...Array(15).keys()].map((k) => ({
      id: k.toString(),
      title: `workout ${k}`,
      date: Date.now().toLocaleString(),
    }))
  );
  const [selectedWorkout, setSelectedWorkout] = React.useState({});
  // TODO set this on get from api
  // and sort it based on name or something
  const [exercises, setExercises] = React.useState(
    [...Array(15).keys()].map((k) => ({
      parentWorkoutId: 1,
      id: k.toString(),
      title: `exercise ${k}`,
      sets: 7 - Math.floor(Math.random() * 6 + 1),
      repRange: [4, 10],
      rest: 45 - Math.floor(Math.random() * 15 + 1),
    }))
  );

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
      setUser(null);
      return;
    }
    if (authRes && !authRes.emailVerified && justRegistered) {
      authRes.sendEmailVerification();
      setJustRegistered(false);
    }
    setUser(authRes);
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
