import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import themeing from './src/theme';

import SplashScreen from './src/components/SplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider theme={themeing}>
      <NavigationContainer theme={themeing}>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
