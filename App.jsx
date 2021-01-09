import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';

import themeing from './src/theme';

import { StateContextProvider, StateContext } from './src/controllers/state';
import NoAuthNavigator from './src/components/NoAuth/NoAuthNavigator';
import AuthNavigator from './src/components/Auth/AuthNavigator.jsx';
import SplashScreen from './src/components/Splash/SplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider theme={themeing}>
      <NavigationContainer theme={themeing}>
        <StateContextProvider>
          <StateContext.Consumer>
            {({ user, isLoading }) => {
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
        </StateContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
