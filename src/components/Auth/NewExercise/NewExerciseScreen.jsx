import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import NewExercise from './parts/NewExercise';

const NewExerciseScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  return (
    <StateContext.Consumer>
      {({ selectedWorkout: { selectedWorkout }, exercises: { exercises, setExercises } }) => (
        <>
          <NewExercise
            exercises={exercises}
            setExercises={setExercises}
            workout={selectedWorkout}
            navigation={navigation}
            theme={theme}
          />
          <WarnModal
            title={notifyTitle}
            buttonText="Yes"
            theme={theme}
            content={notifyMessage}
            visible={showNotify}
            setVisible={setShowNotify}
            onPress={() => setIsOk(true)}
          />
        </>
      )}
    </StateContext.Consumer>
  );
};

export default withTheme(NewExerciseScreen);
