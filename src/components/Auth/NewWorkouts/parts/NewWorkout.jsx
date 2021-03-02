import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import API from '../../../../controllers/WorkoutApi';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, user, theme, data, addWorkoutToList }) => {
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState('');
  const styles = StyleSheet.create({
    input: theme.input,
  });

  const isNameTaken = () => data.map((a) => a.title).includes(workoutName);

  React.useEffect(() => {
    if (!workoutName || isNameTaken()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [workoutName, data]);

  const handleOnPress = async () => {
    setIsLoading(true);
    const workout = {
      title: workoutName,
      date: new Date().toLocaleString(),
      exercises: [],
    };
    const res = await API.newWorkout(user.uid, workout);

    workout.id = res;

    addWorkoutToList(workout);

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
          autoCompleteType="email"
          textContentType="emailAddress"
          label="Workout name"
          error={isError}
          value={workoutName}
          onChangeText={(val) => setWorkoutName(val)}
          style={[styles.input, { paddingTop: 10 }]}
        />
        {!!isNameTaken() && (
          <HelperText type="error" visible={isNameTaken()}>
            Name is already taken!
          </HelperText>
        )}
      </CardWithButton>
    </>
  );
};
export default withTheme(NewWorkout);
