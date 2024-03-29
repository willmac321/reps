import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, withTheme, TextInput, HelperText } from "react-native-paper";
import API from "../../../../controllers/WorkoutApi";
import CardWithButton from "../../../../template/CardWithButton";
import { StateContext } from "../../../../controllers/state";
import { useIsMounted } from "../../../../utils/useIsMounted";
import {useLinkTo} from "@react-navigation/native";

const NewWorkout = ({ navigation, user, theme, data }) => {
  const linkTo = useLinkTo();
  const isMounted = useIsMounted();
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState("");

  const styles = StyleSheet.create({
    input: theme.input,
  });

  const {
    workouts: { workouts },
    editWorkout: { editWorkout },
    setIsFromEditButton,
    selectedWorkout: { setSelectedWorkout },
  } = React.useContext(StateContext);

  const isNameTaken = () =>
    workoutName &&
    editWorkout.title !== workoutName &&
    data.map((a) => a.title).includes(workoutName);

  React.useEffect(() => {
    if (
      isMounted.current &&
      editWorkout &&
      Object.keys(editWorkout).length > 0
    ) {
      setWorkoutName(editWorkout.title);
    }
  }, [editWorkout, isMounted]);

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

    // if it is an existing workout delete it in the db and readd it
    API.deleteWorkout(user.uid, editWorkout.id || workoutName)
      .then(() => {
        API.newWorkout(user.uid, workout);
      })
      .finally(() => {
        setSelectedWorkout(workout, newWorkouts);
        setWorkoutName("");
        setIsLoading(false);
        setIsFromEditButton(false);
        linkTo('/auth/create/newexercises');

      });
  }, [workoutName, workouts, editWorkout, user]);

  return (
    <>
      <CardWithButton
        title={
          <Text theme={theme} style={theme.title}>
            {editWorkout && editWorkout.title
              ? `Editing workout name for "${editWorkout.title}"`
              : "Name your workout"}
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
            right={
              workoutName && (
                <TextInput.Icon
                  fontSize={16}
                  style={{ marginVertical: "auto" }}
                  name="backspace"
                  onPress={() => setWorkoutName("")}
                />
              )
            }
          />
          {!!isNameTaken() && (
            <HelperText
              type="error"
              visible={isError || (editWorkout && isNameTaken())}
            >
              Try a different name!
            </HelperText>
          )}
        </ScrollView>
      </CardWithButton>
    </>
  );
};
export default withTheme(NewWorkout);
