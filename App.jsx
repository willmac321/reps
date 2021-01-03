import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';

import themeing from './src/theme';

import { StateContextProvider } from './src/controllers/state';
import LoginScreen from './src/components/Login/LoginScreen';
import RegisterScreen from './src/components/Register/RegisterScreen';
import SplashScreen from './src/components/Splash/SplashScreen';
import WarnModal from './src/template/WarnModal';

const Stack = createStackNavigator();

const isWeb = Platform.select({
  ios: false,
  android: false,
  native: false,
  default: true,
});

function App() {
  return (
    <PaperProvider theme={themeing}>
      <WarnModal />
      <NavigationContainer theme={themeing}>
        <StateContextProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: isWeb }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: isWeb }}
            />
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: isWeb }} />
          </Stack.Navigator>
        </StateContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
