import React from 'react';
import { useTheme } from 'react-native-paper';
import { useColorScheme, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StateContextProvider, StateContext } from './src/controllers/state';
import { useIsSmallScreen, isMobile } from './src/utils/checkPlatform';
import Route from './src/components/Route';
import themeDark from './src/theme/themeDark';
import themeLight from './src/theme/themeLight';

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

  return (
    <StateContextProvider>
      <StatusBar
        hidden={false}
        backgroundColor={
          colorScheme === 'dark' ? themeDark.colors.background : themeLight.colors.background
        }
      />
      <SafeAreaProvider>
        <StateContext.Consumer>{({ theme }) => <Route theme={theme} />}</StateContext.Consumer>
      </SafeAreaProvider>
    </StateContextProvider>
  );
}

export default App;
