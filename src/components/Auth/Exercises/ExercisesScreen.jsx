import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import Exercises from './parts/Exercises';

const ExercisesScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  return (
    <StateContext.Consumer>
      {({ selectedWorkout: { selectedWorkout }, exercises: { exercises }, isLoading }) => (
        <>
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
      )}
    </StateContext.Consumer>
  );
};

export default withTheme(ExercisesScreen);
