import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
    workouts: { workouts },
    editWorkout: { editWorkout, setEditWorkout },
  } = React.useContext(StateContext);

  const isNameTaken = () =>
    workoutName &&
    editWorkout.title !== workoutName &&
    data.map((a) => a.title).includes(workoutName);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  React.useEffect(() => {
    if (isMounted.current && Object.keys(editWorkout).length > 0) {
      setWorkoutName(editWorkout.title);
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

    // copy context workout version for local use
    let newWorkouts = [...workouts];
    if (editWorkout && editWorkout.id) {
      // filter newWorkouts to all but the one that is being edited.  This is done because
      // the addWorkoutToList func updates local store to use that filtered list and adds the workout to it
      newWorkouts = newWorkouts.filter((d) => d.title !== editWorkout.title);
      workout = newWorkouts.length > 0 ? newWorkouts[0] : workout;
      workout = {
        ...workout,
        id: workoutName,
        title: workoutName,
        date: editWorkout.date,
        exercises: editWorkout.exercises,
      };
    }

    // this either replaces or add workout to context list
    addWorkoutToList(workout, newWorkouts);

    // if it is an existing workout delete it in the db and readd it
    // TODO change to update func instead of delete and replace
    API.deleteWorkout(user.uid, workoutName)
      .then(() => {
        setWorkoutName('');
        setEditWorkout({});
        API.newWorkout(user.uid, workout);
      })
      .finally(() => {
        setIsLoading(false);
        navigation.navigate('NewExercises');
      });
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
      >
        <ScrollView
          style={{
            flex: 1,
            scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
          }}
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
        </ScrollView>
      </CardWithButton>
    </>
  );
};
export default withTheme(NewWorkout);
