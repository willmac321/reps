import React, { useContext, useEffect } from "react";
import { Text, withTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import NotifyModal from "../../../../template/NotifyModal";
import ExercisesCommon from "../../../../common/ExercisesCommon";
import { useLinkTo } from "@react-navigation/native";
import StateContext from "../../../../controllers/state";

const ExercisesList = ({
  setIsLoading,
  navigation,
  theme,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
  isDraggable = false,
}) => {
  const linkTo = useLinkTo();
  const [selected, setSelected] = React.useState(null);
  const [showCompletion, setShowCompletion] = React.useState(false);

  const {
    isCelebrationVisible: isVisible,
    setIsCelebrationsVisible: setIsVisible,
  } = useContext(StateContext);

  const handleNew = () => {
    linkTo("/auth/create/newexercises");
  };

  useEffect(() => {
    if (showCompletion && !isVisible) {
      setIsVisible(true);
    }
  }, [showCompletion]);

  return (
    <View
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        maxHeight: "100%",
        height: "100%",
      }}
    >
      <ExercisesCommon
        setIsLoading={setIsLoading}
        navigation={navigation}
        selected={selected}
        setSelected={setSelected}
        setShowCompletion={setShowCompletion}
        theme={theme}
        handleNew={handleNew}
        OnPressExerciseComponent={OnPressExerciseComponent}
        setSelectedExercise={setSelectedExercise}
        isDraggable={isDraggable}
      />
      <NotifyModal
        title={
          <Text style={{ marginHorizontal: "auto" }}>
            <Text style={{ padding: 2 }}>
              {[...Array(3).keys()].map((v) => (
                <FontAwesome5
                  key={v}
                  name="horse"
                  style={{ fontSize: 24, marginHorizontal: 4 }}
                />
              ))}
              {"  "}
            </Text>
            Yesssss
            <Text style={{ padding: 2 }}>
              {"  "}
              {[...Array(3).keys()].map((v) => (
                <FontAwesome5
                  key={v}
                  name="horse"
                  style={{ fontSize: 24, marginHorizontal: 4 }}
                />
              ))}
            </Text>
          </Text>
        }
        buttonText={
          <FontAwesome5
            name="thumbs-up"
            color={theme.colors.secondary}
            style={{ color: theme.colors.secondary, fontSize: 24 }}
          />
        }
        theme={theme}
        isVisible={showCompletion}
        setIsVisible={setShowCompletion}
        content={
          <Text style={{ marginTop: 24, marginBottom: 4 }}>
            Nice workout! Cool it down now.
          </Text>
        }
        style={{
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 260,
          alignItems: "center",
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default withTheme(ExercisesList);
