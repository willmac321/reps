import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, theme, exercises, setExercises, workout }) => {
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [newExercise, setNewExercise] = React.useState({
    id: '',
    title: '',
    sets: 0,
    repRange: [0, 0],
    rest: 0,
  });

  const styles = StyleSheet.create({
    input: theme.input,
  });

  const isNameTaken = () => exercises.map((a) => a.title).includes(newExercise.name);
  const isEmpty = () =>
    !(
      newExercise.id &&
      newExercise.title &&
      newExercise.sets &&
      newExercise.rest &&
      newExercise.repRange[1]
    );

  React.useEffect(() => {
    if (isEmpty() || isNameTaken()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [workout, exercises]);

  const handleOnPress = () => {
    setIsLoading(true);
    // TODO insert api call here
    // API.login(email, password, callbackHandlePress);
    // then nav to new exercise screen
  };

  return (
    <KeyboardAvoidingView>
      <CardWithButton
        title="Build-a-Exercise"
        buttonText="Add"
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
          value={newExercise.title}
          onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
          style={styles.input}
        />
        {!!isNameTaken() && (
          <HelperText type="error" visible={isNameTaken()}>
            Name is already taken!
          </HelperText>
        )}
        <View>
          <TextInput
            mode="outlined"
            theme={theme}
            autoCompleteType="email"
            textContentType="emailAddress"
            label="Workout name"
            error={isError}
            value={newExercise.title}
            onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
            style={styles.input}
          />
          {!!isNameTaken() && (
            <HelperText type="error" visible={isNameTaken()}>
              Name is already taken!
            </HelperText>
          )}
        </View>
      </CardWithButton>
    </KeyboardAvoidingView>
  );
};
export default withTheme(NewWorkout);
