import React, { useCallback, useContext, useState } from 'react';
import { withTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StateContext } from '../../../controllers/state';
import Exercises from './parts/Exercises';
import Header from '../../../template/Header';
import ExerciseOnPressLog from './parts/ExerciseOnPressLog';
import { isMobile } from '../../../utils/checkPlatform';

const ExercisesScreen = ({ navigation, theme }) => {
  const [isOk, setIsOk] = useState(false);
  const {
    exercises: { getExercises },
    selectedWorkout: { selectedWorkout },
    isLoading,
  } = useContext(StateContext);

  // react navigation version of use effect, called when tab is activated -> ie onMount and when props change
  useFocusEffect(useCallback(() => getExercises(false, selectedWorkout), [selectedWorkout]));

  return (
    <SafeAreaView style={isMobile() ? { flexGrow: 1 } : {}}>
      {selectedWorkout && selectedWorkout.title && (
        <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
      )}
      <Exercises
        navigation={navigation}
        isLoading={isLoading}
        isOk={isOk}
        setIsOk={setIsOk}
        theme={theme}
        OnPressExerciseComponent={ExerciseOnPressLog}
      />
    </SafeAreaView>
  );
};

export default withTheme(ExercisesScreen);
