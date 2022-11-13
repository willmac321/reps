import React, { useCallback, useContext, useState } from 'react';
import { withTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import ScrollViewWrapper from '../../../template/ScrollViewWrapper';
import { StateContext } from '../../../controllers/state';
import Exercises from './parts/Exercises';
import Header from '../../../template/Header';
import ExerciseOnPressLog from './parts/ExerciseOnPressLog';
import SafeArea from '../../../template/SafeAreaWrapper';

const ExercisesScreen = ({ navigation, theme }) => {
  const [isOk, setIsOk] = useState(false);
  const {
    exercises: { getExercises },
    selectedWorkout: { selectedWorkout },
    isLoading,
  } = useContext(StateContext);

  // react navigation version of use effect, called when tab is activated -> ie onMount and when props change
  useFocusEffect(
    useCallback(() => {
      const gettem = async () => {
        await getExercises(true, selectedWorkout);
      };
      gettem();
    }, [selectedWorkout])
  );

  return (
    <SafeArea theme={theme}>
      {selectedWorkout && selectedWorkout.title && (
        <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
      )}
      <ScrollViewWrapper theme={theme}>
        <Exercises
          navigation={navigation}
          isLoading={isLoading}
          isOk={isOk}
          setIsOk={setIsOk}
          theme={theme}
          OnPressExerciseComponent={ExerciseOnPressLog}
        />
      </ScrollViewWrapper>
    </SafeArea>
  );
};

export default withTheme(ExercisesScreen);
