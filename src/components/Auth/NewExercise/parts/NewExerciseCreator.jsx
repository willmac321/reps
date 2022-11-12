import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text, IconButton } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const EMPTY_EXERCISE = {
  // id: '',
  // title: 'ttt',
  // sets: 1,
  // repRange: [3, 2],
  // rest: 4,
  id: '',
  title: '',
  sets: 0,
  repRange: [0, 0],
  rest: 0,
  index: 0,
};

const NewExercise = ({
  theme,
  user,
  exercises,
  workout,
  addExerciseToList,
  prepopulateData = null,
}) => {
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [titleChange, setTitleChange] = React.useState(null);
  const [isError, setIsError] = React.useState({
    title: false,
    sets: false,
    repRange: [false, false],
    rest: false,
  });
  // FIXME
  const [newExercise, setNewExercise] = React.useState(EMPTY_EXERCISE);

  const styles = StyleSheet.create({
    input: theme.input,
    icon: {
      ...theme.title,
    },
    editTitle: {
      alignSelf: 'center',
    },
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
    inputFlex: {
      flex: 0,
      flexGrow: 4,
    },
  });

  const isNameTaken = () => exercises.map((a) => a.title).includes(newExercise.name);
  const isEmpty = useCallback(
    () => !(newExercise.title && newExercise.sets && newExercise.rest && newExercise.repRange[1]),
    [newExercise.title, newExercise.sets, newExercise.rest, newExercise.repRange]
  );

  React.useLayoutEffect(() => {
    if (prepopulateData) {
      setNewExercise(prepopulateData);
    }
  }, [prepopulateData]);

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
          setNewExercise(() => ({ ...newExercise, sets: `${val}` }));
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
    let newE = {};
    setIsLoading(true);
    if (titleChange) {
      titleChange.flush();
    }
    if (prepopulateData) {
      // updating exercise
      newE = await addExerciseToList(newExercise, prepopulateData.id, workout.id);
    } else {
      // new exercise
      newE = await addExerciseToList(newExercise, null, workout.id);
    }
    setNewExercise(newE);
    setIsLoading(false);
  };

  const handleClearForm = () => {
    setNewExercise(EMPTY_EXERCISE);
    // clear the form and deselect in parent
    addExerciseToList(null);
  };

  const title = () => <Text style={styles.editTitle}>Build-a-Exercise</Text>;

  return (
    <View theme={theme}>
      <CardWithButton
        title={title()}
        buttonText={prepopulateData ? 'Modify' : 'Add'}
        showButton
        buttonDisabled={isDisable}
        onPress={handleOnPress}
        isLoading={isLoading}
        theme={theme}
        titleRight={() =>
          !isEmpty() && (
            <IconButton
              size={16}
              icon="times-circle"
              style={{ ...styles.icon }}
              onPress={handleClearForm}
            />
          )
        }
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
            <View theme={theme} style={styles.inputFlex}>
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
                style={[styles.input, styles.rowInput, styles.inputFlex]}
              />
            </View>
            <View theme={theme} style={styles.inputFlex}>
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
                  },
                  styles.inputFlex,
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
            <View theme={theme} style={styles.inputFlex}>
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
                style={[styles.input, styles.rowInput, styles.inputFlex]}
              />
            </View>
          </View>
        </View>
      </CardWithButton>
    </View>
  );
};
export default withTheme(NewExercise);
