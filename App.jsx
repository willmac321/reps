import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { StateContextProvider, StateContext } from './src/controllers/state';
import NoAuthNavigator from './src/components/NoAuth/NoAuthNavigator';
import AuthNavigator from './src/components/Auth/AuthNavigator.jsx';
import SplashScreen from './src/components/Splash/SplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <StateContextProvider>
      <StateContext.Consumer>
        {({ theme }) => (
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <StateContext.Consumer>
                {({ user, isLoading }) => {
                  //FIXME
                  return <AuthNavigator/>;
                  if (isLoading) {
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
                  return user ? <AuthNavigator /> : <NoAuthNavigator />;
                }}
              </StateContext.Consumer>
            </NavigationContainer>
          </PaperProvider>
        )}
      </StateContext.Consumer>
    </StateContextProvider>
  );
}

export default App;
