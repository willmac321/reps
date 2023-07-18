import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Portal, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StateContextProvider, StateContext } from './src/controllers/state';
import NoAuthNavigator from './src/components/NoAuth/NoAuthNavigator';
import AuthNavigator from './src/components/Auth/AuthNavigator.jsx';
import { useIsSmallScreen, isMobile } from './src/utils/checkPlatform';
import themeDark from './src/theme/themeDark';
import themeLight from './src/theme/themeLight';
import LoadingScreenOverlay from './src/template/LoadingScreenOverlay';

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
      <SafeAreaProvider>
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
                    <Portal.Host>
                      <>
                        <LoadingScreenOverlay isVisible={isLoading} theme={theme} />
                        <Stack.Navigator
                          options={{
                            statusuBarStyle: theme.userTheme,
                          }}
                        >
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
                        </Stack.Navigator>
                      </>
                    </Portal.Host>
                  )}
                </StateContext.Consumer>
              </NavigationContainer>
            </PaperProvider>
          )}
        </StateContext.Consumer>
      </SafeAreaProvider>
    </StateContextProvider>
  );
}

export default App;
