import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { dropShadow } from '../../theme';
import SplashScreen from '../Splash/SplashScreen';
import NewWorkoutsScreen from './NewWorkouts/NewWorkoutsScreen';
import NewExercisesScreen from './NewExercise/NewExerciseScreen';
import ExercisesScreen from './Exercises/ExercisesScreen';
import WorkoutsScreen from './Workouts/WorkoutsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  const [currentRoute, setCurrentRoute] = React.useState('Workouts');
  // FIXME remove workouts from lastRoute
  const [lastRoute, setLastRoute] = React.useState('Workouts');

  const setRoute = ({ route }) => ({
    tabPress: () => {
      if (currentRoute !== route.name) {
        setLastRoute(currentRoute);
        setCurrentRoute(route.name);
      }
    },
  });

  // should only route to new exercises when the page is on a selected workout screen
  const NewComponents = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
      <Stack.Screen name="NewExercises" component={NewExercisesScreen} />
      <Stack.Screen name="NewWorkout" component={NewWorkoutsScreen} />
    </Stack.Navigator>
  );

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
      <Tab.Screen name="Create" component={NewComponents} listeners={setRoute} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} listeners={setRoute} />
      <Tab.Screen name="Settings" component={SplashScreen} listeners={setRoute} />
      <Tab.Screen name="Account" component={SplashScreen} listeners={setRoute} />
    </Tab.Navigator>
  );
}

export default withTheme(AuthNavigator);
