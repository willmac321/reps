import React from 'react';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../../template/NotifyModal';
import { StateContext } from '../../../../controllers/state';
import ExercisesCommon from '../../../../common/ExercisesCommon';

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
      <ExercisesCommon
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
        isDraggable={false}
      />
      <NotifyModal
        title="🐎🐎🐎 Yesssss  🐎🐎🐎"
        buttonText="👍"
        theme={theme}
        content="Nice workout!  Cool it down now."
        isVisible={showCompletion}
        setIsVisible={setShowCompletion}
        style={{
          minWidth: 320,
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 210,
          margin: 'auto',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default withTheme(ExercisesList);
