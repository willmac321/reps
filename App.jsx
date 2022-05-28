import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StateContextProvider, StateContext } from './src/controllers/state';
import NoAuthNavigator from './src/components/NoAuth/NoAuthNavigator';
import AuthNavigator from './src/components/Auth/AuthNavigator.jsx';
import SplashScreen from './src/components/Splash/SplashScreen';

const Stack = createStackNavigator();

// const styles = StyleSheet.create({
//   // input: {
//   //   outline: 'none !important',
//   // },
//   root: {
//     overflow: 'hidden',
//   },
// });

function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <StateContextProvider>
      <StateContext.Consumer>
        {({ theme }) => (
          // eslint-disable-next-line
          <PaperProvider theme={theme} settings={{ icon: (props) => <FontAwesome5 {...props} /> }}>
            <SafeAreaProvider>
              <NavigationContainer theme={theme}>
                <StateContext.Consumer>
                  {({ user, isLoading, debug }) => {
                    if (!user && isLoading) {
                      return (
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Reps"
                            component={SplashScreen}
                            options={{ headerShown: false }}
                          />
                        </Stack.Navigator>
                      );
                    }
                    // NOTE debug related might take this out
                    if (debug) {
                      return <AuthNavigator />;
                    }
                    return user ? <AuthNavigator /> : <NoAuthNavigator />;
                  }}
                </StateContext.Consumer>
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        )}
      </StateContext.Consumer>
    </StateContextProvider>
  );
}

export default App;
