import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import API from '../../../../controllers/WorkoutApi';
import CardWithButton from '../../../../template/CardWithButton';
import { StateContext } from '../../../../controllers/state';

const NewWorkout = ({ navigation, user, theme, data, addWorkoutToList }) => {
  const isMounted = React.useRef(true);
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState('');
  const styles = StyleSheet.create({
    input: theme.input,
  });
  const {
    workouts: { workouts, setWorkouts },
    selectedWorkout: { selectedWorkout },
  } = React.useContext(StateContext);

  const isNameTaken = () =>
    workoutName &&
    selectedWorkout.title !== workoutName &&
    data.map((a) => a.title).includes(workoutName);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  React.useEffect(() => {
    if (isMounted.current && Object.keys(selectedWorkout).length > 0) {
      setWorkoutName(selectedWorkout.title);
    }
  }, []);

  React.useEffect(() => {
    setIsError(false);
    if (!workoutName || isNameTaken()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [workoutName, data]);

  const handleOnPress = async () => {
    setIsLoading(true);
    // workout will either be the new created one or the existing workout with the same name
    let workout = {
      title: workoutName,
      id: workoutName,
      date: new Date().toLocaleString(),
      exercises: [],
    };

    let newWorkouts = [...workouts];
    if (selectedWorkout && selectedWorkout.id) {
      newWorkouts = newWorkouts.filter((d) => d.title !== selectedWorkout.title);
      workout = {
        ...workout,
        id: workoutName,
        date: selectedWorkout.date,
        exercises: selectedWorkout.exercises,
      };
    }

    addWorkoutToList(workout, newWorkouts);
    setWorkoutName('');
    setIsLoading(false);
    API.deleteWorkout(user.uid, selectedWorkout.title).then(() => {
      API.newWorkout(user.uid, workout);
    });

    setIsLoading(false);
    navigation.navigate('Create', { screen: 'NewExercises' });
  };

  return (
    <>
      <CardWithButton
        title="Name your workout"
        buttonText="Ok"
        showButton
        buttonDisabled={isDisable}
        onPress={handleOnPress}
        isLoading={isLoading}
        theme={theme}
        style={{ flex: 1 }}
      >
        <TextInput
          mode="outlined"
          theme={theme}
          label="Workout name"
          error={isError}
          value={workoutName}
          onChangeText={(val) => setWorkoutName(val)}
          style={[styles.input, { paddingTop: 10 }]}
        />
        {!!isNameTaken() && (
          <HelperText type="error" visible={isError || isNameTaken()}>
            Try a different name!
          </HelperText>
        )}
      </CardWithButton>
    </>
  );
};
export default withTheme(NewWorkout);
