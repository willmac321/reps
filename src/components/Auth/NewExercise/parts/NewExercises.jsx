import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import Exercises from '../../../../common/Exercises';

const NewExercisesList = ({
  isLoading,
  navigation,
  theme,
  markSelected,
  setMarkSelected,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
}) => {
  const {
    exercises: { exercises },
  } = React.useContext(StateContext);

  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    if (markSelected !== selected && typeof setMarkSelected === 'function')
      setSelected(markSelected);
  }, [markSelected, setMarkSelected, selected, setSelected]);

  return (
    <Exercises
      isLoading={isLoading}
      navigation={navigation}
      exercises={exercises}
      selected={selected}
      setSelected={setMarkSelected}
      theme={theme}
      OnPressExerciseComponent={OnPressExerciseComponent}
      setSelectedExercise={setSelectedExercise}
    />
  );
};

export default withTheme(NewExercisesList);
