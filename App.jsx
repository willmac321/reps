import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import themeing from './src/theme';

import LoginScreen from './src/components/Login/LoginScreen';
import SplashScreen from './src/components/SplashScreen';

const Stack = createStackNavigator();
// <SplashScreen theme={themeing} />

function App() {
  return (
    <PaperProvider theme={themeing}>
      <NavigationContainer theme={themeing}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
