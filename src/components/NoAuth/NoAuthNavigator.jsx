import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';
import { Platform } from 'react-native';

import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import ForgotScreen from './ForgotPassword/ForgotScreen';
import { StateContext } from '../../controllers/state';
import SplashScreen from '../Splash/SplashScreen';

const Stack = createStackNavigator();

const isWeb = Platform.select({
  ios: false,
  android: false,
  native: false,
  default: true,
});

function NoAuthNavigator() {
  const { isLoading, theme } = React.useContext(StateContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: isWeb }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: isWeb }} />
      <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: isWeb }} />
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: isWeb }} />
    </Stack.Navigator>
  );
}

export default withTheme(NoAuthNavigator);
