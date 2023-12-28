import React from "react";
import { withTheme } from "react-native-paper";
import { View } from "react-native";
import CardWithButton from "../../../../template/CardWithButton";
import { useLinkTo } from "@react-navigation/native";

const NewExerciseNext = ({ navigation, theme }) => {
  const linkTo = useLinkTo();
  const handleOnPress = React.useCallback(() => {
    linkTo("/auth/workouts/exercises");
  }, [linkTo]);
  return (
    <View theme={theme}>
      <CardWithButton
        buttonText="Done"
        showButton
        onPress={handleOnPress}
        theme={theme}
      />
    </View>
  );
};

export default withTheme(NewExerciseNext);
