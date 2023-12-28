import React from "react";
import { Provider as PaperProvider, withTheme } from "react-native-paper";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { StateContext } from "../controllers/state";
import NoAuthNavigator from "./NoAuth/NoAuthNavigator";
import AuthNavigator from "./Auth/AuthNavigator.jsx";
import LoadingScreenOverlay from "../template/LoadingScreenOverlay";
import DeleteMeScreen from "./DeleteMe/DeleteMeScreen";
import linking from "../routes/routes";

const Stack = createStackNavigator();

const Route = ({ theme }) => {
  return(
  <PaperProvider
    theme={theme}
    settings={{
      // eslint-disable-next-line
      icon: (props) => <FontAwesome5 {...props} />,
      // eslint-disable-next-line
      name: (props) => <FontAwesome5 {...props} />,
    }}
  >
    <NavigationContainer
      style={{
        flex: 1,
        flexGrow: 1,
      }}
      theme={theme}
      linking={linking}
    >
      <StateContext.Consumer>
        {({ user, isLoading }) => (
          <View
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <LoadingScreenOverlay isVisible={isLoading} theme={theme} />
            <Stack.Navigator
              style={{
                visibility: !isLoading ? "visible" : "hidden",
              }}
              options={{
                statusBarStyle: theme.userTheme,
              }}
            >
              {user && user?.emailVerified ? (
                <Stack.Screen
                  name="AuthNav"
                  component={AuthNavigator}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="NoAuthNav"
                  component={NoAuthNavigator}
                  options={{ headerShown: false }}
                />
              )}
              <Stack.Screen name="DeleteMe" component={DeleteMeScreen} 
                  options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </View>
        )}
      </StateContext.Consumer>
    </NavigationContainer>
  </PaperProvider>
)};

export default withTheme(Route);
