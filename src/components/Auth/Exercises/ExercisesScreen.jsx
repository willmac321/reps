import React, { useCallback, useContext, useState } from 'react';
import { withTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { StateContext } from '../../../controllers/state';
import Exercises from './parts/Exercises';
import Header from '../../../template/Header';
import ExerciseOnPressLog from './parts/ExerciseOnPressLog';

const ExercisesScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = useState(false);
  const [markSelected, setMarkSelected] = React.useState(null);
  const [isOk, setIsOk] = useState(false);
  const {
    exercises: { getExercises },
    selectedWorkout: { selectedWorkout },
    isLoading,
  } = useContext(StateContext);

  // react navigation version of use effect, called when tab is activated -> ie onMount and when props change
  useFocusEffect(useCallback(() => getExercises(), [selectedWorkout]));

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
        OnPressExerciseComponent={ExerciseOnPressLog}
      />
    </>
  );
};

export default withTheme(ExercisesScreen);
