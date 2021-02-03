import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text } from 'react-native-paper';
import API from '../../../../controllers/ExerciseApi';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, theme, user, exercises, workout, addExerciseToList }) => {
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [titleChange, setTitleChange] = React.useState(null);
  const [isError, setIsError] = React.useState({
    title: false,
    sets: false,
    repRange: [false, false],
    rest: false,
  });
  const [newExercise, setNewExercise] = React.useState({
    parentWorkoutIds: [],
    id: '',
    title: '',
    sets: 0,
    repRange: [0, 0],
    rest: 0,
  });

  const styles = StyleSheet.create({
    input: theme.input,
    rowInput: {
      flex: 0,
      flexGrow: 3,
      minWidth: 50,
    },
    rowTextHeader: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    rowText: {
      flexGrow: 1,
      flex: 0,
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 5,
      paddingHorizontal: 2,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 10,
      justifyContent: 'space-around',
      marginTop: 15,
    },
  });

  const isNameTaken = () => exercises.map((a) => a.title).includes(newExercise.name);
  const isEmpty = () =>
    !(newExercise.title && newExercise.sets && newExercise.rest && newExercise.repRange[1]);

  React.useEffect(() => {
    if (isEmpty() || isNameTaken()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [workout, exercises, newExercise]);

  const isValidNumber = (v) => {
    if (v.match(/^[0-9]+$/) !== null) {
      return true;
    }
    return false;
  };

  const setVal = (val, spot) => {
    switch (spot) {
      case 'title':
        if (isNameTaken()) setIsError({ ...isError, title: true });
        else {
          setNewExercise(() => ({ ...newExercise, title: val }));
          setIsError({ ...isError, title: false });
        }
        break;
      case 'sets':
        if (isValidNumber(val)) {
          setNewExercise(() => ({ ...newExercise, sets: val }));
          setIsError({ ...isError, sets: false });
        } else setIsError({ ...isError, sets: true });
        break;
      case 'repLow':
        if (isValidNumber(val)) {
          setNewExercise(() => ({
            ...newExercise,
            repRange: [val, newExercise.repRange[1]],
          }));
          setIsError({
            ...isError,
            repRange: [false, isError.repRange[1]],
          });
        } else setIsError({ ...isError, repRange: [true, isError.repRange[1]] });
        break;
      case 'repHi':
        if (isValidNumber(val)) {
          setNewExercise(() => ({
            ...newExercise,
            repRange: [newExercise.repRange[0], val],
          }));
          setIsError({
            ...isError,
            repRange: [isError.repRange[0], false],
          });
        } else setIsError({ ...isError, repRange: [isError.repRange[0], true] });
        break;
      case 'rest':
        if (isValidNumber(val)) {
          setNewExercise(() => ({
            ...newExercise,
            rest: val,
          }));
          setIsError({ ...isError, rest: false });
        } else setIsError({ ...isError, rest: true });
        break;
      default:
        break;
    }
  };

  const handleOnPress = async () => {
    if (titleChange) titleChange.flush();
    setIsLoading(true);
    setNewExercise({
      ...newExercise,
      parentWorkoutIds: newExercise.parentWorkoutIds.splice().push(workout.id),
      id: await API.newExercise(user.uid, newExercise, workout.id),
    });
    addExerciseToList(newExercise);
    setIsLoading(false);
    // TODO add exercise to list
    navigation.navigate('Splash');
  };

  return (
    <View theme={theme}>
      <CardWithButton
        title="Build-a-Exercise"
        buttonText="Add"
        showButton
        buttonDisabled={isDisable}
        onPress={handleOnPress}
        isLoading={isLoading}
        theme={theme}
      >
        <View>
          <TextInput
            mode="outlined"
            theme={theme}
            autoCompleteType="email"
            textContentType="emailAddress"
            label="Exercise name"
            error={isError.title}
            value={newExercise.title}
            onChangeText={(val) => setTitleChange(setVal(val, 'title'))}
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
                  flex: 0,
                  flexGrow: 4,
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
                label="#"
                error={isError.sets}
                value={newExercise.sets ? newExercise.sets.toString() : ''}
                onChangeText={(val) => setVal(val, 'sets')}
                style={[styles.input, styles.rowInput]}
              />
            </View>
            <View
              theme={theme}
              style={[
                {
                  flex: 0,
                  flexGrow: 4,
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
                    justifyContent: 'space-around',
                    paddingHorizontal: 10,
                    flex: 0,
                    flexGrow: 4,
                  },
                ]}
              >
                <TextInput
                  mode="outlined"
                  theme={theme}
                  textContentType="telephoneNumber"
                  label="min"
                  error={isError.repRange[0]}
                  value={newExercise.repRange[0] ? newExercise.repRange[0].toString() : ''}
                  onChangeText={(val) => setVal(val, 'repLow')}
                  style={[styles.input, styles.rowInput]}
                />
                <Text theme={theme} style={styles.rowText}>
                  to
                </Text>
                <TextInput
                  mode="outlined"
                  theme={theme}
                  textContentType="telephoneNumber"
                  label="max"
                  error={isError.repRange[1]}
                  value={newExercise.repRange[1] ? newExercise.repRange[1].toString() : ''}
                  onChangeText={(val) => setVal(val, 'repHi')}
                  style={[styles.input, styles.rowInput]}
                />
              </View>
            </View>
            <View
              theme={theme}
              style={[
                {
                  flex: 0,
                  flexGrow: 4,
                },
              ]}
            >
              <Text theme={theme} style={styles.rowTextHeader}>
                Rest
              </Text>
              <TextInput
                mode="outlined"
                theme={theme}
                label="sec"
                textContentType="telephoneNumber"
                error={isError.rest}
                value={newExercise.rest ? newExercise.rest.toString() : ''}
                onChangeText={(val) => setVal(val, 'rest')}
                style={[styles.input, styles.rowInput]}
              />
            </View>
          </View>
        </View>
      </CardWithButton>
    </View>
  );
};
export default withTheme(NewWorkout);
