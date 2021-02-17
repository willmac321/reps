import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import Exercises from './parts/Exercises';
import Header from '../../../template/Header';

const ExercisesScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const {
    selectedWorkout: { selectedWorkout },
    exercises: { exercises },
    isLoading,
  } = React.useContext(StateContext);
  return (
    <>
      {selectedWorkout && selectedWorkout.title && (
        <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
      )}
      <Exercises
        exercises={exercises}
        navigation={navigation}
        workout={selectedWorkout}
        setShowNotify={setShowNotify}
        isLoading={
          false
          // FIXME
          //  isLoading}
        }
        isOk={isOk}
        setIsOk={setIsOk}
        theme={theme}
      />
    </>
  );
};

export default withTheme(ExercisesScreen);
