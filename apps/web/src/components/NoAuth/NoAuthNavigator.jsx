import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';
import { Platform } from 'react-native';

import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import ForgotScreen from './ForgotPassword/ForgotScreen';

const Stack = createStackNavigator();

const isWeb = Platform.select({
  ios: false,
  android: false,
  native: false,
  default: true,
});

function NoAuthNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: isWeb }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: isWeb }} />
      <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: isWeb }} />
    </Stack.Navigator>
  );
}

export default withTheme(NoAuthNavigator);
