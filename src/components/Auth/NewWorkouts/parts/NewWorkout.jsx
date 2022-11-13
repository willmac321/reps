import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, withTheme, TextInput, HelperText } from 'react-native-paper';
import API from '../../../../controllers/WorkoutApi';
import CardWithButton from '../../../../template/CardWithButton';
import { StateContext } from '../../../../controllers/state';
import { useIsMounted } from '../../../../utils/useIsMounted';

const NewWorkout = ({ editSelected, navigation, user, theme, data }) => {
  console.log(editSelected);
  const isMounted = useIsMounted();
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState('');

  const styles = StyleSheet.create({
    input: theme.input,
  });

  const {
    workouts: { workouts },
    selectedWorkout: { setSelectedWorkout },
  } = React.useContext(StateContext);

  const isNameTaken = () =>
    workoutName &&
    editSelected.title !== workoutName &&
    data.map((a) => a.title).includes(workoutName);

  React.useEffect(() => {
    if (isMounted.current && editSelected && Object.keys(editSelected).length > 0) {
      setWorkoutName(editSelected.title);
    }
  }, [editSelected, isMounted]);

  React.useEffect(() => {
    setIsError(false);
    if (!workoutName || isNameTaken()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [workoutName, data]);

  const handleOnPress = React.useCallback(async () => {
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
    if (editSelected && editSelected.id) {
      // filter newWorkouts to all but the one that is being edited.  This is done because
      // the addWorkoutToList func updates local store to use that filtered list and adds the workout to it
      newWorkouts = newWorkouts.filter((d) => d.title !== editSelected.title);
      workout = newWorkouts.length > 0 ? newWorkouts[0] : workout;
      workout = {
        ...workout,
        id: workoutName,
        title: workoutName,
        date: editSelected.date,
        exercises: editSelected.exercises,
      };
    }

    // if it is an existing workout delete it in the db and readd it
    // TODO change to update func instead of delete and replace
    API.deleteWorkout(user.uid, editSelected.id || workoutName)
      .then(() => {
        API.newWorkout(user.uid, workout);
      })
      .finally(() => {
        setSelectedWorkout(workout, newWorkouts);
        setWorkoutName('');
        setIsLoading(false);
        navigation.navigate('NewExercises');
      });
  }, [workoutName, workouts, editSelected, user]);

  return (
    <>
      <CardWithButton
        title={
          <Text theme={theme} style={theme.title}>
            {editSelected && editSelected.title
              ? `Editing workout name for "${editSelected.title}"`
              : 'Name your workout'}
          </Text>
        }
        buttonText="Ok"
        showButton
        buttonDisabled={isDisable || isNameTaken()}
        onPress={handleOnPress}
        isLoading={isLoading}
        theme={theme}
      >
        <ScrollView
          style={{
            flexGrow: 1,
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
