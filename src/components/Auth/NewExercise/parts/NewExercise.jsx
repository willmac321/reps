import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text } from 'react-native-paper';
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
    rowInput: {
      flex: 3,
    },
    rowTextHeader: {
      alignSelf: 'flex-start',
      textAlign: 'bottom',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    rowText: {
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      padding: 5,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 10,
      justifyContent: 'space-between',
      marginTop: 15,
    },
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
          style={[styles.input, { marginHorizontal: 10 }]}
        />
        {!!isNameTaken() && (
          <HelperText type="error" visible={isNameTaken()}>
            Name is already taken!
          </HelperText>
        )}
        <View style={[styles.rowContainer]}>
          <View
            theme={theme}
            style={[
              {
                flex: 4,
              },
            ]}
          >
            <Text theme={theme} style={styles.rowTextHeader}>
              Sets
            </Text>
            <TextInput
              mode="outlined"
              theme={theme}
              textContentType="telephoneNumber"
              error={isError}
              value={newExercise.title}
              onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
              style={[styles.input, styles.rowInput]}
            />
            {!!isNameTaken() && (
              <HelperText type="error" visible={isNameTaken()}>
                Name is already taken!
              </HelperText>
            )}
          </View>
          <View
            theme={theme}
            style={[
              {
                flex: 4,
              },
            ]}
          >
            <Text theme={theme} style={[styles.rowTextHeader, { marginLeft: 15 }]}>
              Reps
            </Text>
            <View
              style={[
                styles.rowContainer,
                {
                  marginTop: 0,
                  marginBottom: 0,
                  justifyContent: 'space-evenly',
                  flex: 4,
                },
              ]}
            >
              <TextInput
                mode="outlined"
                theme={theme}
                textContentType="telephoneNumber"
                label="Min"
                error={isError}
                value={newExercise.title}
                onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
                style={[styles.input, styles.rowInput]}
              />
              <Text theme={theme} style={styles.rowText}>
                to
              </Text>
              <TextInput
                mode="outlined"
                theme={theme}
                textContentType="telephoneNumber"
                label="Max"
                error={isError}
                value={newExercise.title}
                onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
                style={[styles.input, styles.rowInput]}
              />
            </View>
          </View>
          <View
            theme={theme}
            style={[
              {
                flex: 4,
              },
            ]}
          >
            <Text theme={theme} style={styles.rowTextHeader}>
              Rest (sec)
            </Text>
            <TextInput
              mode="outlined"
              theme={theme}
              textContentType="telephoneNumber"
              error={isError}
              value={newExercise.title}
              onChangeText={(val) => setNewExercise(() => ({ ...newExercise, title: val }))}
              style={[styles.input, styles.rowInput]}
            />
          </View>
        </View>
      </CardWithButton>
    </KeyboardAvoidingView>
  );
};
export default withTheme(NewWorkout);
