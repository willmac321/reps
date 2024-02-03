import React from "react";
import AuthAPI from "./AuthApi";
import UserSettingsAPI from "./UserSettingsApi";
import WorkoutAPI from "./WorkoutApi";
import ExerciseApi from "./ExerciseApi";
import themeDark from "../theme/themeDark";
import themeLight from "../theme/themeLight";
import { auth } from "../firebase/config";
import {
  getLocalData,
  storeLocalData,
  USER_STORE_KEY,
} from "../firebase/localStorage";
import { isEmpty } from "lodash";

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
  const [debug] = React.useState(
    process.env.NODE_ENV === "development" && false
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCelebrationVisible, setIsCelebrationVisible] = React.useState(false);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [theme, setTheme] = React.useState(themeLight);
  const [isFromEditButton, setIsFromEditButton] = React.useState(false);

  // default user state, use this on account create and overwrite after login
  const [defaultUserDetails] = React.useState({
    theme: "light",
    splashScreenIcon: "aphrodite",
    timeout: false,
    contactEmail: "help@loblollysoftware.com",
  });

  const [userDetails, updateUserDetails] = React.useState({});

  const setUserDetails = (details) => {
    storeLocalData(
      !isEmpty(details) ? details : defaultUserDetails,
      userDetails?.uid || USER_STORE_KEY
    );
    updateUserDetails(details);
  };

  React.useEffect(() => {
    if (Object.keys(userDetails).length) {
      setTheme(userDetails.theme === "light" ? themeLight : themeDark);
    }
  }, [userDetails.theme]);

  const [workouts, setWorkouts] = React.useState([]);

  const [exercises, updateExercises] = React.useState([]);
  const [isFetchingExercises, setIsFetchingExercises] = React.useState(false);
  const [isFetchingWorkouts, setIsFetchingWorkouts] = React.useState(false);

  const [selectedWorkout, updateSelectedWorkout] = React.useState({
    id: null,
    exercises: null,
  });

  const [editWorkout, localSetEditWorkout] = React.useState({});

  const setEditWorkout = async (workout) => {
    if (workout && Object.keys(workout).length > 0) {
      const wRef = await WorkoutAPI.getWorkout(user.uid, workout.id);
      const w = wRef.data();
      localSetEditWorkout(w || {});
      const tempW = workouts.map((myworkouts) => {
        if (myworkouts.id === w.id) return w;
        return myworkouts;
      });
      setWorkouts(tempW);
    } else {
      localSetEditWorkout({});
    }
  };

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

    if (!isAlreadyThere) {
      unsortedWorkouts.push(w);
      const sorted = () =>
        unsortedWorkouts.sort((a, b) => a.id.localeCompare(b.id));
      setWorkouts(sorted);
    }
    updateSelectedWorkout(w);
  };

  const getExercises = async (setLoading = null, selectedW = null) => {
    let localSelectedWorkout = selectedW || selectedWorkout;

    if (typeof localSelectedWorkout === "string" && workouts) {
      localSelectedWorkout =
        workouts.find((workout) => workout.id === localSelectedWorkout) || null;
    }

    if (
      !isEmpty(localSelectedWorkout) &&
      localSelectedWorkout.exercises !== null
    ) {
      if (setLoading) setIsLoading(true);
      try {
        setIsFetchingExercises(true);
        const exs = await ExerciseApi.getExercises(
          user.uid,
          localSelectedWorkout.id
        );
        // set locally
        if (exs && exs.length > 0) {
          updateExercises(exs);
        } else updateExercises([]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetchingExercises(false);
        if (setLoading && !isFetchingWorkouts) setIsLoading(false);
      }
    }
  };

  const addExercise = async (
    newExercise,
    id = null,
    workoutId,
    setLoading = null
  ) => {
    if (setLoading) setIsLoading(true);
    let localExercise = {};
    setIsFetchingExercises(true);
    if (id) {
      await ExerciseApi.updateExercise(user.uid, newExercise);
      localExercise = {
        ...newExercise,
        id,
      };
    } else {
      localExercise = await ExerciseApi.newExercise(
        user.uid,
        newExercise,
        workoutId
      );
    }
    const localSelectedWorkout = {
      ...selectedWorkout,
      exercises: [localExercise, ...exercises],
    };
    updateSelectedWorkout(localSelectedWorkout);

    await getExercises(false, workoutId);
    setIsFetchingExercises(false);
    if (setLoading) setIsLoading(false);

    return localExercise;
  };

  const getWorkouts = React.useCallback((uid, setLoading = null) => {
    if (setLoading) setIsLoading(true);
    setIsFetchingWorkouts(true);
    if (uid && isMounted.current) {
      WorkoutAPI.getWorkouts(uid)
        .then((res) => {
          if (isMounted.current) {
            const t = res.sort((a, b) => a.id.localeCompare(b.id));
            setWorkouts(t);
          }
        })
        .catch(() => {})
        .finally(() => {
          setIsFetchingWorkouts(false);
          setLoading && !isFetchingExercises && setIsLoading(false);
        });
    }
  }, []);

  const updateExerciseOrder = async (newExercises, setLoading = null) => {
    if (setLoading) setIsLoading(true);
    const sortedExercises = newExercises.reduce((acc, curr, i) => {
      const temp = curr;
      temp.index = i;
      return [...acc, temp];
    }, []);

    const sortedWorkout = {
      ...selectedWorkout,
      exercises: sortedExercises.map((e) => e.id),
    };
    if (setLoading) setIsFetchingExercises(true);
    await ExerciseApi.batchUpdateExercises(user.uid, sortedExercises);
    await WorkoutAPI.updateWorkout(user.uid, sortedWorkout);
    updateSelectedWorkout(sortedWorkout);
    setIsFetchingExercises(false);
    if (setLoading) setIsLoading(false);
  };

  const deleteExercise = React.useCallback(
    async (exUid) => {
      if (exUid && isMounted.current) {
        const localExercises = exercises
          .map((e) => e.id)
          .filter((e) => e !== exUid);
        await ExerciseApi.deleteExercise(
          user.uid,
          exUid,
          selectedWorkout.id,
          localExercises
        )
          .then(async () => {
            const localSelectedWorkout = {
              ...selectedWorkout,
              exercises: localExercises,
            };
            updateSelectedWorkout(localSelectedWorkout);
            const getStuff = async () => {
              getExercises(false, selectedWorkout.id);
            };

            if (
              !isEmpty(localSelectedWorkout) &&
              localSelectedWorkout.exercises !== null
            ) {
              await getStuff();
            }
          })
          .catch((e) => console.error(e));
      }
    },
    [user, getExercises, updateSelectedWorkout, exercises, selectedWorkout]
  );

  React.useMemo(() => {
    if (isMounted.current && user?.uid) {
      getWorkouts(user.uid, true);
    }
  }, [user]);

  React.useEffect(() => {
    auth.onAuthStateChanged((authRes) => {
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
            // this is hit on program load and when logged out, set logged out user local when logout endpoint is called
            const localData = await getLocalData(user?.uid || USER_STORE_KEY);
            setUserDetails(localData || defaultUserDetails);
          }
        }
      };

      if (authRes && !authRes.emailVerified && !justRegistered) {
        setUserDetails(defaultUserDetails);
        AuthAPI.logout(() => {});
        // NOTE if statement debug related might take this out
        if (!debug) {
          // if authRes is null -- ie logout then set to default
          setUser(null);
        }
      } else if (authRes && !authRes.emailVerified && justRegistered) {
        setJustRegistered(false);
      } else {
        setDetails(authRes);
      }
      setIsLoading(false);
    });
  }, []);

  const logout = async (callback = () => {}) => {
    await AuthAPI.logout(() => {});
    callback();
    // NOTE if statement debug related might take this out
    if (isMounted.current) {
      if (!debug) {
        // if authRes is null -- ie logout then set to default
        setUserDetails(defaultUserDetails);
      }
    }
  };

  const setIsCelebrationsVisible = (value)=>{
    setIsCelebrationVisible(value);
  }

  return (
    <StateContext.Provider
      value={{
        debug,
        isLoading,
        setIsLoading: (v) => setIsLoading(v !== null ? v : !isLoading),
        isCelebrationVisible,
        setIsCelebrationsVisible,
        user,
        defaultUserDetails,
        userDetails,
        setUserDetails,
        setJustRegistered,
        workouts: { workouts, setWorkouts },
        exercises: {
          exercises,
          getExercises,
          deleteExercise,
          addExercise,
          updateExerciseOrder,
          isFetchingExercises,
        },
        selectedWorkout: { selectedWorkout, setSelectedWorkout },
        editWorkout: { editWorkout, setEditWorkout },
        theme,
        logout,
        isFromEditButton,
        setIsFromEditButton,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
