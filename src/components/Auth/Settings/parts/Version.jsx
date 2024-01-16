import React from "react";
import { withTheme, Text, List } from "react-native-paper";
import { version } from "../../../../../package.json";
const Version = ({ theme }) => {
  return (
    <List.Item
      title="App Version"
      theme={theme}
      right={() => (
        <Text style={{ marginHorizontal: 16 }} theme={theme}>
          {version}
        </Text>
      )}
    />
  );
};

export default withTheme(Version);
