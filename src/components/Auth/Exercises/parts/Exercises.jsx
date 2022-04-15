import React from 'react';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../../template/NotifyModal';
import { StateContext } from '../../../../controllers/state';
import Exercises from '../../../../common/Exercises';

const ExercisesList = ({
  isLoading,
  navigation,
  theme,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
}) => {
  const {
    exercises: { exercises },
  } = React.useContext(StateContext);

  const [selected, setSelected] = React.useState(null);
  const [showCompletion, setShowCompletion] = React.useState(false);

  const handleNew = () => {
    navigation.navigate('Create', { screen: 'NewExercises' });
  };

  return (
    <>
      <Exercises
        isLoading={isLoading}
        navigation={navigation}
        exercises={exercises}
        selected={selected}
        setSelected={setSelected}
        setShowCompletion={setShowCompletion}
        theme={theme}
        handleNew={handleNew}
        OnPressExerciseComponent={OnPressExerciseComponent}
        setSelectedExercise={setSelectedExercise}
      />
      <NotifyModal
        title="🐎🐎🐎 Yesssss  🐎🐎🐎"
        buttonText="👍"
        theme={theme}
        content="Nice work out!  Cool it down now."
        isVisible={showCompletion}
        setIsVisible={setShowCompletion}
        style={{
          width: 'unset',
          margin: 'auto',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default withTheme(ExercisesList);
