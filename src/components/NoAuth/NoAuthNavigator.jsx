import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { withTheme } from "react-native-paper";

import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";
import ForgotScreen from "./ForgotPassword/ForgotScreen";

const Stack = createStackNavigator();

function NoAuthNavigator({ theme }) {
  return (
    <Stack.Navigator
      screenOptions={(ev) => ({
        headerBackVisible: false,
        headerTitleStyle: { ...theme.title },
        headerStyle: {
          borderBottomWidth: 4,
          borderBottomColor: theme.colors.primary,
        },
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
  );
}

export default withTheme(NoAuthNavigator);
