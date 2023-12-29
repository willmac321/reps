import React from "react";
import { View } from "react-native";
import { Title, withTheme } from "react-native-paper";
import CardWithButton from "../template/CardWithButton";
const DeleteMe = () => {

  return (
    <View>
      <CardWithButton buttonDisabled title={"Page Not Found"}>
        <Title>Uhoh, this page doesn't exist!</Title>
      </CardWithButton>
    </View>
  );
};

export default withTheme(DeleteMe);
