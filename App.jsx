import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { LogBox, SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { StateContextProvider, StateContext } from './src/controllers/state';
import NoAuthNavigator from './src/components/NoAuth/NoAuthNavigator';
import AuthNavigator from './src/components/Auth/AuthNavigator.jsx';
import SplashScreen from './src/components/Splash/SplashScreen';
import { useIsSmallScreen, isMobile } from './src/utils/checkPlatform';
import themeDark from './src/theme/themeDark';
import themeLight from './src/theme/themeLight';

const Stack = createStackNavigator();

function App() {
  const themeh = useTheme();
  const colorScheme = useColorScheme();
  const isScreenSmall = useIsSmallScreen();
  React.useEffect(() => {
    if (!isMobile()) {
      const root = document.getElementById('root');
      if (root) {
        if (!isScreenSmall) root.style.overflowY = 'hidden';
        root.style.backgroundColor = themeh.colors.background;
      } else {
        console.error("Couldn't get root view to fix web ScrollView.");
      }
    }
  });

  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <StateContextProvider>
      <StateContext.Consumer>
        {({ theme }) => (
          <PaperProvider
            theme={theme}
            settings={{
              // eslint-disable-next-line
              icon: (props) => <FontAwesome5 {...props} />,
              // eslint-disable-next-line
              name: (props) => <FontAwesome5 {...props} />,
            }}
          >
            <SafeAreaView
              style={{
                flex: 1,
                flexGrow: 1,
              }}
            >
              <StatusBar
                hidden={false}
                backgroundColor={
                  colorScheme === 'dark'
                    ? themeDark.colors.background
                    : themeLight.colors.background
                }
              />
              <NavigationContainer theme={theme}>
                <StateContext.Consumer>
                  {({ user, isLoading }) => (
                    <Stack.Navigator
                      options={{
                        statusuBarStyle: theme.userTheme,
                      }}
                    >
                      <>
                        {!user && isLoading ? (
                          <Stack.Screen
                            name="Reps"
                            component={SplashScreen}
                            options={{
                              headerShown: false,
                            }}
                          />
                        ) : (
                          <>
                            {user ? (
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
                          </>
                        )}
                      </>
                    </Stack.Navigator>
                  )}
                </StateContext.Consumer>
              </NavigationContainer>
            </SafeAreaView>
          </PaperProvider>
        )}
      </StateContext.Consumer>
    </StateContextProvider>
  );
}

export default App;
