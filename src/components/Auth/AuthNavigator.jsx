import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'react-native-paper';

import SplashScreen from '../Splash/SplashScreen';

const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Workouts" component={SplashScreen} />
      <Tab.Screen name="Create" component={SplashScreen} />
      <Tab.Screen name="Settings" component={SplashScreen} />
      <Tab.Screen name="Account" component={SplashScreen} />
    </Tab.Navigator>
  );
}

export default withTheme(AuthNavigator);
