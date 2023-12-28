import React from "react";
import { withTheme, List, IconButton } from "react-native-paper";
import { View, Animated, Easing } from "react-native";
import { StateContext } from "../../../../controllers/state";
import CardWithButton from "../../../../template/CardWithButton";
import ScrollList from "../../../../template/ScrollList";
import WorkoutItem from "./WorkoutItem";
import WorkoutAPI from "../../../../controllers/WorkoutApi";
import { useIsMounted } from "../../../../utils/useIsMounted";
import { useFocusEffect, useLinkTo } from "@react-navigation/native";

const Workouts = ({
  theme,
  navigation,
  setMessage,
  setNotifyTitle,
  setShowNotify,
  isOk,
  setIsOk,
  showEdit = true,
  showTrash = true,
  isEditScreen = false,
}) => {
  const {
    user,
    setIsFromEditButton,
    selectedWorkout: { setSelectedWorkout },
    editWorkout: { setEditWorkout },
    workouts: { workouts, setWorkouts },
    isLoading,
  } = React.useContext(StateContext);

  const linkTo = useLinkTo();

  const [isDisable, setIsDisable] = React.useState(true);

  const isMounted = useIsMounted();

  const [selected, setSelected] = React.useState(null);

  const [isDelete, setIsDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [modalOnOkSelectedId, setModalOnOkSelected] = React.useState("");
  const springAnim = React.useRef(new Animated.Value(1)).current;
  const springOut = (callback) => {
    Animated.timing(springAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.out(Easing.exp),
    }).start(callback);
  };

  const panX = springAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const setUpdatedWorkout = (id) => {
    if (id) {
      setSelectedWorkout(workouts.find((a) => a.id === id.toString()));
    } else {
      setSelectedWorkout();
    }
  };

  const setWorkoutToEdit = React.useCallback(
    async (id) => {
      if (id) {
        await setEditWorkout(workouts.find((a) => a.title === id));
      } else {
        setEditWorkout({});
      }
    },
    [workouts]
  );

  const deleteWorkout = React.useCallback(
    async (id) => {
      if (id && user && user.uid && isMounted.current) {
        await WorkoutAPI.deleteWorkout(user.uid, id);
      }
      springOut(() => {
        setWorkoutToEdit();
        if (isMounted.current) {
          setIsOk(false);
          setModalOnOkSelected(null);
          setSelected(null);
          setEditWorkout({});
        }
        springAnim.setValue(1);
        setWorkouts(() => [...workouts].filter((d) => d.id !== id));
        setModalOnOkSelected(null);
      });
    },
    [user, workouts]
  );

  const handleEditWorkout = React.useCallback(
    async (id) => {
      await setWorkoutToEdit(id);
      setUpdatedWorkout({});
      linkTo("/auth/create/newworkout");
      setModalOnOkSelected(null);
    },
    [user, workouts]
  );

  const handleOnSubmit = React.useCallback(
    async (id) => {
      setUpdatedWorkout(id);
      await setWorkoutToEdit();
      linkTo("/auth/workouts/exercises");
    },
    [workouts, isDisable]
  );

  const onPress = React.useCallback(
    (id) => {
      setIsFromEditButton(false);
      setIsDisable(false);
      if (selected === id) {
        setEditWorkout({});
        setSelected(null);
        setIsDisable(true);
      } else {
        setSelected(id);
        const workout = workouts.filter((d) => d.id === id)[0];
        setEditWorkout(workout);
      }
    },
    [selected]
  );

  const handleEdit = (_, id) => {
    const workout = workouts.filter((d) => d.id === id)[0];
    setEditWorkout(workout);
    setIsFromEditButton(true);
    setIsDelete(false);
    setSelected(id);
    setIsDisable(true);
    setNotifyTitle("You wanna change this?");
    setMessage(`You're about to edit ${workout.title}, ok?`);
    setIsOk(false);
    setIsEdit(true);
    setModalOnOkSelected(workout.id);
    setShowNotify(true);
  };

  const handleTrash = (_, id) => {
    setIsFromEditButton(false);
    setIsEdit(false);
    setIsDisable(true);
    setSelected(id);
    setNotifyTitle("Woah, you sure...");
    setMessage(
      `Do you really want to delete ${
        workouts.filter((d) => d.id === id)[0].id
      }?`
    );
    setIsOk(false);
    setIsDelete(true);
    setModalOnOkSelected(id);
    setShowNotify(true);
  };

  const handleNew = () => {
    setIsFromEditButton(false);
    linkTo("/auth/create");
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isMounted.current) {
        if (isOk && modalOnOkSelectedId) {
          if (isDelete) {
            deleteWorkout(modalOnOkSelectedId);
            setIsDelete(false);
          } else if (isEdit) {
            handleEditWorkout(modalOnOkSelectedId);
            setIsEdit(false);
          }
          setIsOk(false);
        }
        if (!isOk && modalOnOkSelectedId) {
          setIsDisable(false);
        }
      }
    }, [isOk, modalOnOkSelectedId])
  );

  const Item = ({ item }) => (
    <Animated.View
      style={
        item && item.id === selected
          ? { transform: [{ translateX: panX }] }
          : null
      }
    >
      <WorkoutItem
        onPress={() => onPress(item.id)}
        isSelected={item && item.id === selected}
        text={item}
        handleTrash={handleTrash}
        handleEdit={handleEdit}
        showEdit={showEdit}
        showTrash={showTrash}
      />
    </Animated.View>
  );

  const EmptyComponent = () => (
    <List.Item
      title="Do you even lift? Try making a workout!"
      titleStyle={{
        ...theme.buttonText,
        color: theme.colors.primary,
      }}
      theme={theme}
      style={[
        theme.buttonText,
        {
          borderColor: theme.colors.primary,
          borderWidth: 2,
          borderRadius: 10,
          color: theme.colors.primary,
        },
      ]}
      onPress={handleNew}
      right={() => (
        <>
          <IconButton
            size={16}
            icon="plus-square"
            color={theme.colors.primary}
            style={{
              marginVertical: 20,
              ...theme.title,
            }}
            onPress={handleNew}
          />
        </>
      )}
    />
  );

  const ItemSeparator = () => (
    <View
      style={{
        marginTop: 16,
        marginBottom: 16,
        marginRight: "auto",
        marginLeft: "auto",
        borderColor: theme.colors.primary,
        borderRadius: theme.roundness,
        borderWidth: 1,
        width: "90%",
      }}
    />
  );

  return (
    <View
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        maxHeight: "100%",
      }}
    >
      <CardWithButton
        buttonText={"Select"}
        showButton={!isEditScreen && workouts && workouts.length > 0}
        theme={theme}
        buttonDisabled={isDisable}
        onPress={() => handleOnSubmit(selected)}
        isLoading={isLoading}
        flex={1}
        style={{
          flexShrink: 1,
          flexBasis: "auto",
          flexGrow: 0,
          marginBottom: 20,
          maxHeight: "100%",
        }}
      >
        {!isLoading && (
          <ScrollList
            data={workouts}
            renderItem={Item}
            keyExtractor={(item) => item && item.id}
            extraData={selected}
            theme={theme}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyComponent}
          />
        )}
      </CardWithButton>
    </View>
  );
};

export default withTheme(Workouts);
