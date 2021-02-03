import React from 'react';
import debounce from 'lodash/debounce';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, theme, exercises, setExercises, workout }) => {
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
        else setNewExercise(() => ({ ...newExercise, title: val }));
        break;
      case 'sets':
        if (isValidNumber(val)) setNewExercise(() => ({ ...newExercise, sets: val }));
        else setIsError({ ...isError, sets: true });
        break;
      case 'repLow':
        if (isValidNumber(val))
          setNewExercise(() => ({
            ...newExercise,
            repRange: [val, newExercise.repRange[1]],
          }));
        else setIsError({ ...isError, repRange: [true, newExercise.repRange[1]] });
        break;
      case 'repHi':
        if (isValidNumber(val))
          setNewExercise(() => ({
            ...newExercise,
            repRange: [newExercise.repRange[0], val],
          }));
        else setIsError({ ...isError, repRange: [newExercise.repRange[0], true] });
        break;
      case 'rest':
        if (isValidNumber(val))
          setNewExercise(() => ({
            ...newExercise,
            rest: val,
          }));
        else setIsError({ ...isError, rest: true });
        break;
      default:
        break;
    }
  };

  const handleOnPress = () => {
    if (titleChange) titleChange.flush();
    setIsLoading(true);
    // TODO insert api call here
    // API.login(email, password, callbackHandlePress);
    // then nav to new exercise screen
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
            error={isError}
            value={newExercise.title}
            onChangeText={(val) => setTitleChange(debounce(() => setVal(val, 'title'), 50))}
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
                error={isError}
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
                  error={isError}
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
                  error={isError}
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
                error={isError}
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
