import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, theme, data }) => {
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

  const handleOnPress = () => {
    setIsLoading(true);
    // TODO insert api call here
    // API.login(email, password, callbackHandlePress);
    // then nav to new exercise screen
  };

  return (
    <>
      <CardWithButton
        title="Name your workout"
        buttonText="Ok"
        showButton
        buttonDisabled={isDisable}
        flex={1}
        onPress={handleOnPress}
        isLoading={isLoading}
        theme={theme}
        style={{}}
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
          style={styles.input}
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
