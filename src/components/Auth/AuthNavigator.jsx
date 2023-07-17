import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme, Portal } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { dropShadow } from '../../theme/themeLight';
import NewWorkoutsScreen from './NewWorkouts/NewWorkoutsScreen';
import NewExercisesScreen from './NewExercise/NewExerciseScreen';
import ExercisesScreen from './Exercises/ExercisesScreen';
import WorkoutsScreen from './Workouts/WorkoutsScreen';
import SettingsScreen from './Settings/SettingsScreen';
import { StateContext } from '../../controllers/state';
import LoadingScreenOverlay from '../../template/LoadingScreenOverlay';

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
const NewComponents = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NewWorkout" component={NewWorkoutsScreen} />
    <Stack.Screen name="NewExercises" component={NewExercisesScreen} />
  </Stack.Navigator>
);

const WorkoutComponents = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Workouts" component={WorkoutsScreen} />
    <Stack.Screen name="Exercises" component={ExercisesScreen} />
  </Stack.Navigator>
);

function AuthNavigator({ theme }) {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    editWorkout: { setEditWorkout },
    selectedWorkout: { setSelectedWorkout },
    isLoading,
  } = React.useContext(StateContext);

  // should only route to new exercises when the page is on a selected workout screen
  return (
    <Portal.Host>
      <Tab.Navigator
        screenOptions={(ev) => screenOptions(ev)}
        initialRouteName="Workouts"
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
        <Tab.Screen
          name="Create"
          component={NewComponents}
          listeners={({ navigation }) => ({
            tabPress: () => {
              if (isMounted.current && navigation.isFocused()) {
                setEditWorkout({});
                setSelectedWorkout({});
                navigation.navigate('Create', { screen: 'NewWorkout' });
              }
            },
          })}
        />
        <Tab.Screen name="Workouts" component={WorkoutComponents} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <LoadingScreenOverlay theme={theme} isVisible={isLoading} />
    </Portal.Host>
  );
}

export default withTheme(AuthNavigator);
