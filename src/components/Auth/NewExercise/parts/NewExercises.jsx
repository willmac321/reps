import React from "react";
import { withTheme } from "react-native-paper";
import { Animated, Easing } from "react-native";
import { StateContext } from "../../../../controllers/state";
import ExercisesCommon from "../../../../common/ExercisesCommon";
import { useIsMounted } from "../../../../utils/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";

const NewExercisesList = ({
  isLoading,
  navigation,
  theme,
  markSelected,
  isOk,
  setIsOk,
  setMarkSelected,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
  setNotifyTitle,
  setNotifyMessage,
  setShowNotify,
  showScrollView,
  setIsReload = () => {},
}) => {
  const {
    exercises: { exercises, deleteExercise },
  } = React.useContext(StateContext);

  const isMounted = useIsMounted();

  const [selected, setSelected] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [modalOnOkSelectedId, setModalOnOkSelected] = React.useState("");
  const springAnim = React.useRef(new Animated.Value(1)).current;
  const springOut = (callback) => {
    Animated.timing(springAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.out(Easing.exp),
    }).start(callback);
  };

  // FIXME shows exercise item again just before delete
  const animateDeleteExercise = React.useCallback(
    (id) => {
      springOut(async () => {
        await deleteExercise(id);
        if (isMounted.current) {
          setModalOnOkSelected(null);
        }
      });
    },
    [exercises]
  );

  const panX = springAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1200, 0],
  });

  const handleTrash = (exerciseId) => {
    setNotifyTitle("Woah, you sure...");
    setNotifyMessage(
      `Do you really want to delete ${
        exercises.filter((d) => d.id === exerciseId)[0].name
      }?`
    );
    setIsOk(false);
    setIsDelete(true);
    setModalOnOkSelected(exerciseId);
    setShowNotify(true);
    setMarkSelected(exerciseId);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (markSelected !== selected && typeof setMarkSelected === "function")
        setSelected(markSelected);
    }, [markSelected, setMarkSelected, selected, setSelected])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!modalOnOkSelectedId) {
        setIsDelete(false);
        setMarkSelected(null);
      }
    }, [modalOnOkSelectedId])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (isMounted.current) {
        if (isOk && isDelete && modalOnOkSelectedId) {
          springAnim.setValue(1);
          animateDeleteExercise(modalOnOkSelectedId);
        }
      }
    }, [isOk])
  );

  return (
    <ExercisesCommon
      isLoading={isLoading}
      navigation={navigation}
      selected={selected}
      setSelected={setMarkSelected}
      theme={theme}
      OnPressExerciseComponent={OnPressExerciseComponent}
      setSelectedExercise={setSelectedExercise}
      showTrash
      handleTrash={handleTrash}
      panX={isDelete ? panX : null}
      showScrollView={showScrollView}
      showAnimation={false}
      setIsReload={setIsReload}
      isDraggable
    />
  );
};

export default withTheme(NewExercisesList);
