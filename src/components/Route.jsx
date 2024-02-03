import React from "react";
import { Provider as PaperProvider, withTheme } from "react-native-paper";
import { View } from "react-native";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { StateContext } from "../controllers/state";
import NoAuthNavigator from "./NoAuth/NoAuthNavigator";
import AuthNavigator from "./Auth/AuthNavigator.jsx";
import LoadingScreenOverlay from "../template/LoadingScreenOverlay";
import DeleteMeScreen from "./DeleteMe/DeleteMeScreen";
import config from "../routes/routes";
import NotFoundScreen from "./NotFoundScreen";
import CelebrationOverlay from "../template/CelebrationOverlay";

const Stack = createStackNavigator();

const prefixList = [Linking.createURL("/")];

const Route = ({ theme }) => {
  // TODO
  //https://medium.com/codex/react-navigation-deep-linking-with-authentication-9056eb4a0456
  return (
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
        linking={{ prefixes: prefixList, config }}
      >
        <StateContext.Consumer>
          {({
            user,
            isLoading,
          }) => {
            return (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <LoadingScreenOverlay isVisible={!!isLoading} theme={theme} />
                <CelebrationOverlay />
                <View
                  style={{
                    visibility: !isLoading ? "visible" : "hidden",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Stack.Navigator
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
                    <Stack.Screen
                      name="DeleteMe"
                      component={DeleteMeScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="NotFound"
                      component={NotFoundScreen}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </View>
              </View>
            );
          }}
        </StateContext.Consumer>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default withTheme(Route);
