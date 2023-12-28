import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { withTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

import { dropShadow } from "../../theme/themeLight";
import NewWorkoutsScreen from "./NewWorkouts/NewWorkoutsScreen";
import NewExercisesScreen from "./NewExercise/NewExerciseScreen";
import ExercisesScreen from "./Exercises/ExercisesScreen";
import WorkoutsScreen from "./Workouts/WorkoutsScreen";
import SettingsScreen from "./Settings/SettingsScreen";
import { StateContext } from "../../controllers/state";
import {useLinkTo} from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    switch (route.name) {
      case "Workouts":
        iconName = "dumbbell";
        break;
      case "Create":
        iconName = "plus-square";
        break;
      case "Settings":
        iconName = "cog";
        break;
      case "Account":
        iconName = "user";
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
    <Stack.Screen name="WorkoutsList" component={WorkoutsScreen} />
    <Stack.Screen name="Exercises" component={ExercisesScreen} />
  </Stack.Navigator>
);

function AuthNavigator({ theme }) {
  const isMounted = React.useRef(true);
  const linkTo = useLinkTo();
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    editWorkout: { setEditWorkout },
    selectedWorkout: { setSelectedWorkout },
  } = React.useContext(StateContext);

  // should only route to new exercises when the page is on a selected workout screen
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Tab.Navigator
        backBehavior="history"
        screenOptions={(ev) => ({
          ...screenOptions(ev),
          tabBarActiveTintColor: theme.colors.textSelected,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarInactiveBackgroundColor: theme.colors.background,
          tabBarActiveBackgroundColor: theme.colors.secondary,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 4,
            borderTopColor: theme.colors.primary,
            ...dropShadow(),
          },
          headerShown: false,
        })}
        initialRouteName="Workouts"
      >
        <Tab.Screen
          name="Create"
          component={NewComponents}
          listeners={({ navigation }) => ({
            tabPress: () => {
              if (isMounted.current && navigation.isFocused()) {
                setEditWorkout({});
                setSelectedWorkout({});
                linkTo('/auth/create/newworkout');
              }
            },
          })}
        />
        <Tab.Screen name="Workouts" component={WorkoutComponents} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default withTheme(AuthNavigator);
