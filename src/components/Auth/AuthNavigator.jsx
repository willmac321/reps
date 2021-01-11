import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { dropShadow } from '../../theme';
import SplashScreen from '../Splash/SplashScreen';
import WorkoutsScreen from './Workouts/WorkoutsScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case 'Workouts':
        iconName = 'dumbbell';
        break;
      case 'Create':
        iconName = 'plus-square';
        break;
      case 'Settings':
        iconName = 'cog';
        break;
      case 'Account':
        iconName = 'user';
        break;
      default:
        break;
    }
    return <FontAwesome5 name={iconName} color={color} size={size} />;
  },
});

function AuthNavigator({ theme }) {
  return (
    <Tab.Navigator
      screenOptions={(ev) => screenOptions(ev)}
      tabBarOptions={{
        activeTintColor: theme.colors.textSelected,
        inactiveTintColor: theme.colors.text,
        inactiveBackgroundColor: theme.colors.background,
        activeBackgroundColor: theme.colors.secondary,
        keyboardHidesTabBar: true,
        showLabel: false,
        tabStyle: {},
        style: {
          borderTopWidth: 0,
          ...dropShadow(),
        },
      }}
    >
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Create" component={SplashScreen} />
      <Tab.Screen name="Settings" component={SplashScreen} />
      <Tab.Screen name="Account" component={SplashScreen} />
    </Tab.Navigator>
  );
}

export default withTheme(AuthNavigator);
