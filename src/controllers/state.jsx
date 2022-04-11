import React from 'react';
import { isEqual } from 'lodash';
import { firebase } from '../firebase/config';
import AuthAPI from './AuthApi';
import UserSettingsAPI from './UserSettingsApi';
import WorkoutAPI from './WorkoutApi';
import ExerciseApi from './ExerciseApi';
import themeDark from '../theme/themeDark';
import themeLight from '../theme/themeLight';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  // this is used because everything is mounted twice in dev to stest for errors, like long async api calls having no object to update
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
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
    splashScreenIcon: 'aphrodite',
    timeout: false,
    contactEmail: 'help@loblollysoftware.com',
  });

  // TODO use saved state for init
  // may need to have seperate collection by a device uid that isn't tied to user id
  const [userDetails, setUserDetails] = React.useState({
    theme: 'light',
    splashScreenIcon: 'aphrodite',
    timeout: false,
    contactEmail: 'help@loblollysoftware.com',
  });

  const theme = userDetails.theme !== 'light' ? themeDark : themeLight;

  const [workouts, setWorkouts] = React.useState([]);

  // TODO set this on get from api
  // and sort it based on name or something
  const [exercises, updateExercises] = React.useState([]);

  const [selectedWorkout, updateSelectedWorkout] = React.useState({
    id: null,
    exercises: null,
  });
  const [editWorkout, setEditWorkout] = React.useState({});

  // update local workouts at the same time
  const setSelectedWorkout = (w, ws = workouts) => {
    if (!w || (w && !w.id)) {
      updateSelectedWorkout({});
      return;
    }

    let isAlreadyThere = false;
    const unsortedWorkouts = ws.map((a) => {
      if (a.id === w.id) {
        isAlreadyThere = true;
        return w;
      }
      return a;
    });

    if (isMounted.current) updateSelectedWorkout(w);
    if (!isAlreadyThere) {
      unsortedWorkouts.push(w);
      setWorkouts(() => unsortedWorkouts.sort((a, b) => a.id.localeCompare(b.id)));
    }
  };

  const setExercises = (ex, id = -1) => {
    // if ex for set is an array of exercises, just set these and return
    if (isMounted.current && Array.isArray(ex)) {
      updateExercises(ex);
      return;
    }
    // for local state
    // add exercise to list
    // add exercise uid to workout
    updateExercises([...exercises, ex]);
    // update selected workout exercise array
    const currExercise = [...selectedWorkout.exercises];
    if (currExercise.indexOf(ex.id) > -1) {
      currExercise.splice(currExercise.indexOf(ex.id), 1);
    }
    if (id > -1) {
      currExercise.splice(id, 0, ex.id);
    } else {
      currExercise.push(ex.id);
    }

    // FIXME commented out because it messes up the add exercise flow and triggeres rerender
    // // update workouts array too
    // if (isMounted.current)
    //   setWorkouts(() =>
    //     workouts.map((w) => {
    //       if (w.id === selectedWorkout.id) {
    //         return selectedWorkout;
    //       }
    //       return w;
    //     })
    //   );
  };

  const getExercises = () => {
    const getStuff = async () => {
      const exs = await ExerciseApi.getExercises(user.uid, selectedWorkout.exercises);
      if (isMounted.current && !isEqual(exs, exercises)) {
        setExercises([...exs]);
      }
      setIsLoading(false);
    };

    if (selectedWorkout && selectedWorkout !== {} && selectedWorkout.exercises !== null) {
      setIsLoading(true);
      getStuff();
    }
  };

  const getWorkouts = React.useCallback((uid) => {
    setIsLoading(true);
    if (uid && isMounted.current) {
      WorkoutAPI.getWorkouts(uid)
        .then((res) => {
          if (isMounted.current) {
            const t = res.sort((a, b) => a.id.localeCompare(b.id));
            setWorkouts(t);
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  React.useMemo(() => {
    if (isMounted.current && user && user.uid) {
      getWorkouts(user.uid);
    }
  }, [user]);

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
    const setDetails = async (aR) => {
      // NOTE debug related might take this out
      if (!debug) {
        setUser(aR);
        // set user settings if auth user changes
        if (aR && aR.uid) {
          const res = await UserSettingsAPI.getSettings(aR.uid);
          if (res && !(res instanceof Error)) {
            setUserDetails(res);
          } else {
            setUserDetails(defaultUserDetails);
          }
        } else {
          setUserDetails(defaultUserDetails);
        }
      }
    };

    if (authRes && !authRes.emailVerified && !justRegistered) {
      AuthAPI.logout(() => {});
      // NOTE if statement debug related might take this out
      if (!debug) {
        // if authRes is null -- ie logout then set to default
        setUserDetails(defaultUserDetails);
        setUser(null);
      }
      return;
    }

    if (authRes && !authRes.emailVerified && justRegistered) {
      authRes.sendEmailVerification();
      setJustRegistered(false);
    }

    setDetails(authRes);
  }, [authRes]);

  return (
    <StateContext.Provider
      value={{
        debug,
        isLoading,
        setIsLoading: (v) => setIsLoading(v !== null ? v : !isLoading),
        user,
        defaultUserDetails,
        userDetails,
        setUserDetails,
        setJustRegistered,
        workouts: { workouts, setWorkouts },
        exercises: { exercises, setExercises, getExercises },
        selectedWorkout: { selectedWorkout, setSelectedWorkout },
        editWorkout: { editWorkout, setEditWorkout },
        theme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
