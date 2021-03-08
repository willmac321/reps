import React from 'react';
import { withTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { isEqual } from 'lodash';
import { StateContext } from '../../../controllers/state';
import ExerciseApi from '../../../controllers/ExerciseApi';
import Exercises from './parts/Exercises';
import Header from '../../../template/Header';

const ExercisesScreen = ({ navigation, theme }) => {
  const isMounted = React.useRef(true);
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const {
    user,
    exercises: { exercises, setExercises },
    selectedWorkout: { selectedWorkout },
    isLoading,
  } = React.useContext(StateContext);

  // react navigation version of use effect, called when tab is activated -> ie onMount and when props change
  useFocusEffect(
    React.useCallback(() => {
      isMounted.current = true;
      const getStuff = async () => {
        const exs = await ExerciseApi.getExercises(user.uid, selectedWorkout.exercises);
        if (isMounted.current && !isEqual(exs, exercises)) {
          setExercises([...exs]);
        }
      };

      getStuff();
      return () => {
        isMounted.current = false;
      };
    }, [])
  );

  return (
    <>
      {selectedWorkout && selectedWorkout.title && (
        <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
      )}
      <Exercises
        navigation={navigation}
        setShowNotify={setShowNotify}
        isLoading={isLoading}
        isOk={isOk}
        setIsOk={setIsOk}
        theme={theme}
      />
    </>
  );
};

export default withTheme(ExercisesScreen);
